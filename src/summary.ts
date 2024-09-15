import * as image from './image.js'

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
      `  <td align="right">Passed&nbsp;&nbsp;${image.passedImage}</td>`,
      `  <td align="right"><b>${this.stats.passed}</b></td>`,
      '</tr>',
      '<tr>',
      `  <td align="right">Failed&nbsp;&nbsp;${image.failedImage}</td>`,
      `  <td align="right"><b>${this.stats.failed}</b></td>`,
      '</tr>'
    ]
    if (this.stats.skipped) {
      lines.push(
        '<tr>',
        `  <td align="right">Skipped&nbsp;&nbsp;${image.skippedImage}</td>`,
        `  <td align="right"><b>${this.stats.skipped}</b></td>`,
        '</tr>'
      )
    }
    if (this.stats.expectedFailure) {
      lines.push(
        '<tr>',
        `  <td align="right">Expected Failure&nbsp;&nbsp;${image.expectedFailureImage}</td>`,
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
