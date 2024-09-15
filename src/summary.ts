import * as Image from './image.js'

const passedIcon = Image.testStatus('Success')
const failedIcon = Image.testStatus('Failure')
const skippedIcon = Image.testStatus('Skipped')
const expectedFailureIcon = Image.testStatus('Expected Failure')

export class TestSummaryStats {
  passed = 0
  failed = 0
  skipped = 0
  expectedFailure = 0
  total = 0
}

export type TestSummaryStatsGroup = { [key: string]: TestSummaryStats }

export class TestSummary {
  stats = new TestSummaryStats()
  duration = 0
  groups = {} as { [key: string]: TestSummaryStatsGroup }

  createMarkdown(): string[] {
    const lines = [
      '<table>',
      '<tr>',
      `  <td align="right" colspan="2"><b>${this.stats.total}</b></td>`,
      '</tr>',
      '<tr>',
      `  <td align="right">Passed&nbsp;&nbsp;${passedIcon}</td>`,
      `  <td align="right"><b>${this.stats.passed}</b></td>`,
      '</tr>',
      '<tr>',
      `  <td align="right">Failed&nbsp;&nbsp;${failedIcon}</td>`,
      `  <td align="right"><b>${this.stats.failed}</b></td>`,
      '</tr>'
    ]
    if (this.stats.skipped) {
      lines.push(
        '<tr>',
        `  <td align="right">Skipped&nbsp;&nbsp;${skippedIcon}</td>`,
        `  <td align="right"><b>${this.stats.skipped}</b></td>`,
        '</tr>'
      )
    }
    if (this.stats.expectedFailure) {
      lines.push(
        '<tr>',
        `  <td align="right">Expected Failure&nbsp;&nbsp;${expectedFailureIcon}</td>`,
        `  <td align="right"><b>${this.stats.expectedFailure}</b></td>`,
        '</tr>'
      )
    }
    lines.push(
      '<tr>',
      `  <td align="right" colspan="2">${this.duration.toFixed(2)}s</td>`,
      '</tr>',
      '</table>'
    )
    return lines
  }
}
