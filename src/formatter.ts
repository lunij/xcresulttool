/*eslint-disable no-shadow */

import * as image from './image.js'
import * as path from 'path'

import {
  Annotation,
  BuildLog,
  TestFailure,
  TestFailureGroup,
  TestFailures,
  TestReport,
  TestReportChapter,
  TestReportChapterSummary,
  TestReportSection,
  actionTestSummaries,
  actionTestSummary
} from './report.js'
import { anchorIdentifier, anchorNameTag } from './markdown.js'

import { ActionTestFailureSummary } from '../dev/@types/ActionTestFailureSummary.d.js'
import { ActionTestMetadata } from '../dev/@types/ActionTestMetadata.d.js'
import { ActionTestPlanRunSummaries } from '../dev/@types/ActionTestPlanRunSummaries.d.js'
import { ActionTestSummary } from '../dev/@types/ActionTestSummary.d.js'
import { ActionTestSummaryGroup } from '../dev/@types/ActionTestSummaryGroup.d.js'
import { ActionTestableSummary } from '../dev/@types/ActionTestableSummary.d.js'
import { ActionsInvocationMetadata } from '../dev/@types/ActionsInvocationMetadata.d.js'
import { ActionsInvocationRecord } from '../dev/@types/ActionsInvocationRecord.d.js'
import { ActivityLogSection } from '../dev/@types/ActivityLogSection.d.js'

import { Convert } from './coverage.js'
import { createCodeCoverageMarkdown } from './code-coverage.js'
import { TestSummary, TestSummaryStats, TestSummaryStatsGroup } from './summary.js'
import { Parser } from './parser.js'
import { XCResultTool } from './xcresulttool.js'
import { XCCov } from './xccov.js'

export class Formatter {
  readonly summaries = ''
  readonly details = ''

  private bundlePath: string

  constructor(bundlePath: string) {
    this.bundlePath = bundlePath
  }

  async format(options: FormatterOptions = new FormatterOptions()): Promise<TestReport> {
    const testReport = new TestReport()
    var json = await XCResultTool.json(this.bundlePath)
    const actionsInvocationRecord: ActionsInvocationRecord = await Parser.parse(json)

    if (actionsInvocationRecord.metadataRef) {
      json = await XCResultTool.json(this.bundlePath, actionsInvocationRecord.metadataRef.id)
      const metadata: ActionsInvocationMetadata = await Parser.parse(json)

      testReport.entityName = metadata.schemeIdentifier?.entityName
      testReport.creatingWorkspaceFilePath = metadata.creatingWorkspaceFilePath
    }

    if (actionsInvocationRecord.actions) {
      for (const action of actionsInvocationRecord.actions) {
        if (action.buildResult.logRef) {
          json = await XCResultTool.json(this.bundlePath, action.buildResult.logRef.id)
          const log: ActivityLogSection = await Parser.parse(json)
          const buildLog = new BuildLog(log, testReport.creatingWorkspaceFilePath)
          if (buildLog.content.length) {
            testReport.buildLog = buildLog
            testReport.testStatus = 'failure'
            for (const annotation of buildLog.annotations) {
              testReport.annotations.push(annotation)
            }
          }
        }
        if (action.actionResult) {
          if (action.actionResult.testsRef) {
            const testReportChapter = new TestReportChapter(
              action.schemeCommandName,
              action.runDestination,
              action.title
            )
            testReport.chapters.push(testReportChapter)

            json = await XCResultTool.json(this.bundlePath, action.actionResult.testsRef.id)
            const actionTestPlanRunSummaries: ActionTestPlanRunSummaries = await Parser.parse(json)

            for (const summary of actionTestPlanRunSummaries.summaries) {
              for (const testableSummary of summary.testableSummaries) {
                const testSummaries: actionTestSummaries = []
                await this.collectTestSummaries(
                  testableSummary,
                  testableSummary.tests,
                  testSummaries
                )
                if (testableSummary.name) {
                  testReportChapter.sections[testableSummary.name] = new TestReportSection(
                    testableSummary,
                    testSummaries
                  )
                }
              }
            }

            if (action.actionResult.coverage) {
              try {
                const codeCoverage = Convert.toCodeCoverage(
                  await XCCov.viewCodeCoverage(this.bundlePath)
                )
                testReport.codeCoverage = codeCoverage
              } catch (error) {
                // no-op
              }
            }
          }
        }
      }
    }

    const testSummary = new TestSummary()

    for (const chapter of testReport.chapters) {
      const chapterSummary = new TestReportChapterSummary()
      chapter.summaries.push(chapterSummary)

      for (const [identifier, results] of Object.entries(chapter.sections)) {
        const detailGroup = results.details.reduce(
          (groups: { [key: string]: actionTestSummaries }, detail) => {
            const d = detail as actionTestSummary & { group?: string }
            if (d.group) {
              if (groups[d.group]) {
                groups[d.group].push(detail)
              } else {
                groups[d.group] = [detail]
              }
            }
            return groups
          },
          {}
        )

        const group: TestSummaryStatsGroup = {}
        for (const [identifier, details] of Object.entries(detailGroup)) {
          const [stats, duration] = details.reduce(
            ([stats, duration]: [TestSummaryStats, number], detail) => {
              const test = detail as ActionTestSummary
              if (test.testStatus) {
                switch (test.testStatus) {
                  case 'Success':
                    stats.passed++
                    break
                  case 'Failure':
                    stats.failed++
                    break
                  case 'Skipped':
                    stats.skipped++
                    break
                  case 'Expected Failure':
                    stats.expectedFailure++
                    break
                }

                stats.total++
              }

              if (test.duration) {
                duration = test.duration
              }
              return [stats, duration]
            },
            [new TestSummaryStats(), 0]
          )
          testSummary.stats.passed += stats.passed
          testSummary.stats.failed += stats.failed
          testSummary.stats.skipped += stats.skipped
          testSummary.stats.expectedFailure += stats.expectedFailure
          testSummary.stats.total += stats.total
          testSummary.duration += duration

          group[identifier] = {
            passed: stats.passed,
            failed: stats.failed,
            skipped: stats.skipped,
            expectedFailure: stats.expectedFailure,
            total: stats.total
          }
        }

        const groups = testSummary.groups
        groups[identifier] = group
      }

      const summaryMarkdown = testSummary.createMarkdown()
      chapterSummary.content.push(...summaryMarkdown)

      if (testSummary.stats.failed > 0) {
        testReport.testStatus = 'failure'
      } else if (testSummary.stats.passed > 0) {
        testReport.testStatus = 'success'
      }

      if (options.showTestSummaries) {
        const testClassSummaries = this.createTestClassSummaries(testSummary, chapter)
        chapterSummary.content.push(...testClassSummaries)
      }

      const testFailures = new TestFailures()
      const annotations: Annotation[] = []
      for (const [, results] of Object.entries(chapter.sections)) {
        const testResultSummaryName = results.summary.name

        const detailGroup = results.details.reduce(
          (groups: { [key: string]: actionTestSummaries }, detail) => {
            const d = detail as actionTestSummary & { group?: string }
            if (d.group) {
              if (groups[d.group]) {
                groups[d.group].push(detail)
              } else {
                groups[d.group] = [detail]
              }
            }
            return groups
          },
          {}
        )

        for (const [, details] of Object.entries(detailGroup)) {
          const configurationGroup = details.reduce(
            (groups: { [key: string]: actionTestSummaries }, detail) => {
              if (detail.identifier) {
                if (groups[detail.identifier]) {
                  groups[detail.identifier].push(detail)
                } else {
                  groups[detail.identifier] = [detail]
                }
              }
              return groups
            },
            {}
          )

          for (const [, details] of Object.entries(configurationGroup)) {
            for (const [, detail] of details.entries()) {
              const testResult = detail as ActionTestMetadata

              if (testResult.summaryRef) {
                json = await XCResultTool.json(this.bundlePath, testResult.summaryRef.id)
                const summary: ActionTestSummary = await Parser.parse(json)

                if (summary.failureSummaries) {
                  const testFailureGroup = new TestFailureGroup(
                    testResultSummaryName || '',
                    summary.identifier || '',
                    summary.name || ''
                  )
                  testFailures.failureGroups.push(testFailureGroup)

                  const testFailure = new TestFailure()
                  testFailureGroup.failures.push(testFailure)

                  const failureSummaries = collectFailureSummaries(summary.failureSummaries)
                  for (const failureSummary of failureSummaries) {
                    testFailure.lines.push(`${failureSummary.contents}`)

                    const workspace = path.dirname(`${testReport.creatingWorkspaceFilePath}`)
                    let filepath = ''
                    if (failureSummary.filePath) {
                      filepath = failureSummary.filePath.replace(`${workspace}/`, '')
                    }
                    if (filepath && failureSummary.lineNumber && failureSummary.message) {
                      const annotation = new Annotation(
                        filepath,
                        failureSummary.lineNumber,
                        failureSummary.lineNumber,
                        'failure',
                        failureSummary.message,
                        failureSummary.issueType
                      )
                      annotations.push(annotation)
                    }
                  }
                }
              }
            }
          }
        }
      }
      for (const annotation of annotations) {
        testReport.annotations.push(annotation)
      }

      const failuresSection = this.createFailuresSection(testFailures)
      chapterSummary.content.push(...failuresSection)

      if (
        testReport.codeCoverage &&
        options.showCodeCoverage &&
        testReport.creatingWorkspaceFilePath
      ) {
        const codeCoverageMarkdown = createCodeCoverageMarkdown(
          testReport.codeCoverage,
          testReport.creatingWorkspaceFilePath,
          options.showFileCoverage
        )
        chapterSummary.content.push(...codeCoverageMarkdown)
      }
    }

    return testReport
  }

  private createTestClassSummaries(testSummary: TestSummary, chapter: TestReportChapter): string[] {
    var summaries = ['', '---', '', '### Test Summary']
    for (const [groupIdentifier, group] of Object.entries(testSummary.groups)) {
      summaries.push('')
      const anchorName = anchorIdentifier(groupIdentifier)
      const anchorTag = anchorNameTag(`${groupIdentifier}_summary`)
      summaries.push(`#### ${anchorTag}[${groupIdentifier}](${anchorName})\n`)

      const runDestination = chapter.runDestination
      summaries.push(
        `- **Device:** ${runDestination.targetDeviceRecord.modelName}, ${runDestination.targetDeviceRecord.operatingSystemVersionWithBuildNumber}`
      )
      summaries.push(
        `- **SDK:** ${runDestination.targetSDKRecord.name}, ${runDestination.targetSDKRecord.operatingSystemVersion}`
      )

      summaries.push('<table>')
      const header = [
        `<tr>`,
        `  <th>Test</th>`,
        `  <th>Total</th>`,
        `  <th>${image.passedImage}</th>`,
        `  <th>${image.failedImage}</th>`,
        `  <th>${image.skippedImage}</th>`,
        `  <th>${image.expectedFailureImage}</th>`,
        `</tr>`
      ]
      summaries.push(...header)

      for (const [identifier, stats] of Object.entries(group)) {
        summaries.push('<tr>')
        const testClass = identifier
        const testClassAnchor = anchorNameTag(`${groupIdentifier}_${identifier}_summary`)
        const anchorName = anchorIdentifier(`${groupIdentifier}_${identifier}`)
        const testClassLink = `<a href="${anchorName}">${testClass}</a>`
        const cols = [
          `  <td align="left" width="368px">${testClassAnchor}${testClassLink}</td>`,
          `  <td align="right" width="80px">${stats.total}</td>`,
          `  <td align="right" width="80px">${stats.passed}</td>`,
          `  <td align="right" width="80px">${stats.failed}</td>`,
          `  <td align="right" width="80px">${stats.skipped}</td>`,
          `  <td align="right" width="80px">${stats.expectedFailure}</td>`
        ]
        summaries.push(...cols)
        summaries.push('</tr>')
      }
      summaries.push('</table>')
    }
    return summaries
  }

  private createFailuresSection(testFailures: TestFailures): string[] {
    const failuresSection: string[] = []
    if (testFailures.failureGroups.length) {
      failuresSection.push(...['', '---', ''])
      failuresSection.push(`### Failures`)

      for (const failureGroup of testFailures.failureGroups) {
        if (failureGroup.failures.length) {
          const testIdentifier = `${failureGroup.summaryIdentifier}_${failureGroup.identifier}`
          const anchorName = anchorIdentifier(testIdentifier)
          const anchorTag = anchorNameTag(`${testIdentifier}_failure-summary`)
          const testMethodLink = `${anchorTag}<a href="${anchorName}">${failureGroup.summaryIdentifier}/${failureGroup.identifier}</a>`
          failuresSection.push(`<h4>${testMethodLink}</h4>`)
          for (const failure of failureGroup.failures) {
            for (const line of failure.lines) {
              failuresSection.push(line)
            }
          }
        }
      }
    }
    return failuresSection
  }

  async collectTestSummaries(
    group: ActionTestableSummary | ActionTestSummaryGroup,
    tests: actionTestSummaries,
    testSummaries: actionTestSummaries
  ): Promise<void> {
    if (!tests) {
      return
    }

    for (const test of tests) {
      if (test.hasOwnProperty('subtests')) {
        const group = test as ActionTestSummaryGroup
        await this.collectTestSummaries(group, group.subtests, testSummaries)
      } else {
        const t = test as actionTestSummary & { group?: string }
        t.group = group.name
        testSummaries.push(test)
      }
    }
  }
}

function collectFailureSummaries(failureSummaries: ActionTestFailureSummary[]): FailureSummary[] {
  return failureSummaries.map(failureSummary => {
    const fileName = failureSummary.fileName
    const sourceCodeContext = failureSummary.sourceCodeContext
    const callStack = sourceCodeContext?.callStack
    const location = sourceCodeContext?.location
    const filePath = location?.filePath || fileName
    const lineNumber = location?.lineNumber

    let fileLocation = ''
    if (fileName && lineNumber) {
      fileLocation = `${fileName}:${lineNumber}`
    } else if (fileName) {
      fileLocation = fileName
    }

    const titleAlign = 'align="right"'
    const titleWidth = 'width="100px"'
    const titleAttr = `${titleAlign} ${titleWidth}`
    const detailWidth = 'width="668px"'
    const contents =
      '<table>' +
      `<tr><td ${titleAttr}><b>File</b><td ${detailWidth}>${fileLocation}` +
      `<tr><td ${titleAttr}><b>Issue Type</b><td ${detailWidth}>${failureSummary.issueType}` +
      `<tr><td ${titleAttr}><b>Message</b><td ${detailWidth}>${failureSummary.message}` +
      `</table>\n`

    const stackTrace = callStack
      ?.map((callStack, index) => {
        const addressString = callStack.addressString
        const symbolInfo = callStack.symbolInfo
        const imageName = symbolInfo?.imageName || ''
        const symbolName = symbolInfo?.symbolName || ''
        const location = symbolInfo?.location
        const filePath = location?.filePath || fileName
        const lineNumber = location?.lineNumber
        const seq = `${index}`.padEnd(2, ' ')
        return `${seq} ${imageName} ${addressString} ${symbolName} ${filePath}: ${lineNumber}`
      })
      .join('\n')
    return {
      filePath,
      lineNumber,
      issueType: failureSummary.issueType,
      message: failureSummary.message,
      contents,
      stackTrace: stackTrace || []
    } as FailureSummary
  })
}

interface FailureSummary {
  filePath: string
  lineNumber: number
  issueType: string
  message: string
  contents: string
  stackTrace: string
}

export class FormatterOptions {
  showPassedTests: boolean
  showCodeCoverage: boolean
  showFileCoverage: boolean
  showTestSummaries: boolean

  constructor(
    showPassedTests = true,
    showCodeCoverage = true,
    showFileCoverage = true,
    showTestSummaries = true
  ) {
    this.showPassedTests = showPassedTests
    this.showCodeCoverage = showCodeCoverage
    this.showFileCoverage = showFileCoverage
    this.showTestSummaries = showTestSummaries
  }
}
