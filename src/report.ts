import * as pathModule from 'path'

import { ActionRunDestinationRecord } from '../dev/@types/ActionRunDestinationRecord.d.js'
import { ActionTestMetadata } from '../dev/@types/ActionTestMetadata.d.js'
import { ActionTestSummary } from '../dev/@types/ActionTestSummary.d.js'
import { ActionTestSummaryGroup } from '../dev/@types/ActionTestSummaryGroup.d.js'
import { ActionTestSummaryIdentifiableObject } from '../dev/@types/ActionTestSummaryIdentifiableObject.d.js'
import { ActionTestableSummary } from '../dev/@types/ActionTestableSummary.d.js'
import { ActivityLogCommandInvocationSection } from '../dev/@types/ActivityLogCommandInvocationSection.d.js'
import { ActivityLogSection } from '../dev/@types/ActivityLogSection.d.js'
import { CodeCoverage } from './coverage.js'

export type TestStatus =
  | 'action_required'
  | 'cancelled'
  | 'failure'
  | 'neutral'
  | 'success'
  | 'skipped'
  | 'stale'
  | 'timed_out'

export class TestReport {
  entityName?: string
  creatingWorkspaceFilePath?: string
  testStatus: TestStatus = 'neutral'

  buildLog?: BuildLog
  readonly chapters: TestReportChapter[] = []
  codeCoverage?: CodeCoverage
  readonly annotations: Annotation[] = []

  get reportSummary(): string {
    const lines: string[] = []

    if (this.buildLog) {
      const content = this.buildLog.content.join('\n')
      lines.push(`## Build Summary\n\n${content}\n`)
    }

    for (const chapter of this.chapters) {
      for (const chapterSummary of chapter.summaries) {
        let summaryTitle = ''
        if (chapter.title) {
          summaryTitle = `## ${chapter.title}`
        } else if (this.entityName) {
          summaryTitle = `## ${chapter.schemeCommandName} ${this.entityName}`
        } else {
          summaryTitle = `## ${chapter.schemeCommandName}`
        }

        const summaryContent = chapterSummary.content.join('\n')
        lines.push(`${summaryTitle}\n\n${summaryContent}`)
      }
    }

    return lines.join('\n')
  }
}

export class TestReportChapter {
  readonly title?: string
  readonly schemeCommandName: string
  readonly runDestination: ActionRunDestinationRecord
  readonly sections: { [key: string]: TestReportSection } = {}

  readonly summaries: TestReportChapterSummary[] = []

  constructor(
    schemeCommandName: string,
    runDestination: ActionRunDestinationRecord,
    title?: string
  ) {
    this.schemeCommandName = schemeCommandName
    this.runDestination = runDestination
    this.title = title
  }
}

export class TestReportChapterSummary {
  readonly content: string[] = []
}

export class TestReportSection {
  readonly summary: ActionTestableSummary
  readonly details: actionTestSummaries

  readonly sectionSummary: string[] = []

  constructor(summary: ActionTestableSummary, details: actionTestSummaries) {
    this.summary = summary
    this.details = details
  }
}

export class TestFailures {
  readonly failureGroups: TestFailureGroup[] = []
}

export class TestFailureGroup {
  readonly summaryIdentifier: string
  readonly identifier: string
  readonly name: string

  readonly failures: TestFailure[] = []

  constructor(summaryIdentifier: string, identifier: string, name: string) {
    this.summaryIdentifier = summaryIdentifier
    this.identifier = identifier
    this.name = name
  }
}

export class TestFailure {
  readonly lines: string[] = []
}

type AnnotationLevel = 'failure' | 'notice' | 'warning'

export class Annotation {
  path: string
  start_line: number
  end_line: number
  start_column?: number
  end_column?: number
  annotation_level: AnnotationLevel
  message: string
  title?: string
  raw_details?: string

  constructor(
    path: string,
    start_line: number,
    end_line: number,
    annotation_level: AnnotationLevel,
    message: string,
    title?: string,
    raw_details?: string
  ) {
    this.path = path
    this.start_line = start_line
    this.end_line = end_line
    this.annotation_level = annotation_level
    this.message = message
    this.title = title
    this.raw_details = raw_details
  }
}

export type actionTestSummary =
  | ActionTestSummaryIdentifiableObject
  | ActionTestSummaryGroup
  | ActionTestSummary
  | ActionTestMetadata

export type actionTestSummaries = actionTestSummary[]

export class BuildLog {
  content: string[] = []
  readonly annotations: Annotation[] = []

  constructor(log: ActivityLogSection, creatingWorkspaceFilePath?: string) {
    const lines: string[] = []
    if (!log.subsections) {
      return
    }
    const workspace = pathModule.dirname(`${creatingWorkspaceFilePath ?? ''}`)
    const re = new RegExp(`${workspace}/`, 'g')

    const failures = log.subsections.filter(subsection => {
      if (subsection.hasOwnProperty('exitCode')) {
        const logCommandInvocationSection = subsection as ActivityLogCommandInvocationSection
        return logCommandInvocationSection.exitCode !== 0
      } else {
        return subsection.result !== 'succeeded'
      }
    })
    for (const failure of failures) {
      if (failure.subsections) {
        for (const subsection of failure.subsections) {
          if (subsection.hasOwnProperty('exitCode')) {
            const logCommandInvocationSection = subsection as ActivityLogCommandInvocationSection
            if (logCommandInvocationSection.exitCode === 0) {
              continue
            }
            lines.push(`<b>${logCommandInvocationSection.title}</b>`)
            if (!subsection.messages) {
              continue
            }
            for (const message of subsection.messages) {
              if (message.category) {
                lines.push(`${message.type}:&nbsp;${message.category}:&nbsp;${message.title}`)
              } else {
                lines.push(`${message.type}:&nbsp;${message.title}`)
              }

              if (message.location?.url) {
                let startLine = 0
                let endLine = 0

                const url = new URL(message.location?.url)
                const locations = url.hash.substring(1).split('&') as [string]
                for (const location of locations) {
                  const pair = location.split('=')
                  if (pair.length === 2) {
                    const value = parseInt(pair[1])
                    switch (pair[0]) {
                      case 'StartingLineNumber': {
                        // StartingLineNumber is 0-based, but we need a 1-based value
                        // see https://github.com/diogot/danger-xcode_summary/blob/master/lib/xcode_summary/plugin.rb#L207
                        startLine = value + 1
                        break
                      }
                      case 'EndingLineNumber': {
                        endLine = value + 1
                        break
                      }
                      default:
                        break
                    }
                  }
                }
                const location = url.pathname.replace('file://', '').replace(re, '')
                const annotation = new Annotation(
                  location,
                  startLine,
                  endLine,
                  'failure',
                  message.title,
                  message.type
                )
                this.annotations.push(annotation)
              }
            }
            const pre = '```\n'
            const emittedOutput = logCommandInvocationSection.emittedOutput.replace(re, '')
            lines.push(`${pre}${emittedOutput}${pre}`)
          } else if (subsection.result !== 'succeeded') {
            lines.push(subsection.title)
            for (const message of subsection.messages) {
              lines.push(message.title)
            }
          }
        }
      } else {
        if (failure.hasOwnProperty('exitCode')) {
          const logCommandInvocationSection = failure as ActivityLogCommandInvocationSection
          if (logCommandInvocationSection.exitCode === 0) {
            continue
          }
          lines.push(`<b>${logCommandInvocationSection.title}</b>`)
          if (!failure.messages) {
            continue
          }
          for (const message of failure.messages) {
            if (message.category) {
              lines.push(`${message.type}:&nbsp;${message.category}:&nbsp;${message.title}`)
            } else {
              lines.push(`${message.type}:&nbsp;${message.title}`)
            }

            if (message.location?.url) {
              let startLine = 0
              let endLine = 0

              const url = new URL(message.location?.url)
              const locations = url.hash.substring(1).split('&') as [string]
              for (const location of locations) {
                const pair = location.split('=')
                if (pair.length === 2) {
                  const value = parseInt(pair[1])
                  switch (pair[0]) {
                    case 'StartingLineNumber': {
                      startLine = value + 1
                      break
                    }
                    case 'EndingLineNumber': {
                      endLine = value + 1
                      break
                    }
                    default:
                      break
                  }
                }
              }
              const location = url.pathname.replace('file://', '').replace(re, '')
              const annotation = new Annotation(
                location,
                startLine,
                endLine,
                'failure',
                message.title,
                message.type
              )
              this.annotations.push(annotation)
            }
          }
          const pre = '```\n'
          const emittedOutput = logCommandInvocationSection.emittedOutput.replace(re, '')
          lines.push(`${pre}${emittedOutput}${pre}`)
        } else if (failure.result !== 'succeeded') {
          lines.push(failure.title)
          for (const message of failure.messages) {
            lines.push(message.title)
          }
        }
      }
    }
    if (failures.length) {
      this.content.push(lines.join('\n'))
    }
  }
}
