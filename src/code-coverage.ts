import * as github from '@actions/github'
import * as path from 'path'
import * as image from './image.js'
import { CodeCoverage } from './coverage.js'

export function createCodeCoverageMarkdown(
  codeCoverage: CodeCoverage,
  workspaceFilePath: string,
  showFileCoverage: boolean
): string[] {
  const workspace = path.dirname(`${workspaceFilePath}`)
  const regExp = new RegExp(`${workspace}/`, 'g')
  let root = ''
  if (process.env.GITHUB_REPOSITORY) {
    const pr = github.context.payload.pull_request
    const sha = (pr && pr.head.sha) || github.context.sha
    root = `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/blob/${sha}/`
  }

  const lines = ['', '---', '']
  lines.push('### Code Coverage')
  lines.push('<table>')
  lines.push('<tr>')
  lines.push('<th width="344px"></th>')
  lines.push('<th colspan="2">Coverage</th>')
  lines.push('<th width="100px">Covered</th>')
  lines.push('<th width="100px">Executable</th>')
  lines.push('</tr>')

  for (const target of codeCoverage.targets) {
    if (target.name.endsWith('.xctest')) {
      continue
    }

    const lineCoverage = target.lineCoverage * 100

    lines.push('<tr>')
    lines.push(`<th align="left">${target.name}</th>`)
    lines.push(`<th width="120px">${image.coverageBarImage(lineCoverage)}</th>`)
    lines.push(`<th width="104px" align="right">${lineCoverage.toFixed(1)} %</th>`)
    lines.push(`<th align="right">${target.coveredLines}</th>`)
    lines.push(`<th align="right">${target.executableLines}</th>`)
    lines.push('</tr>')

    if (showFileCoverage) {
      const sortedFiles = target.files.sort((a, b) => {
        if (a.lineCoverage !== b.lineCoverage) {
          return b.lineCoverage - a.lineCoverage
        }
        return a.name.localeCompare(b.name)
      })

      for (const file of sortedFiles) {
        const lineCoverage = file.lineCoverage * 100

        lines.push('<tr>')
        lines.push(`<td><a href="${file.path}">${file.name}</a></td>`)
        lines.push(`<td>${image.coverageBarImage(lineCoverage)}</td>`)
        lines.push(`<td align="right">${lineCoverage.toFixed(1)} %</td>`)
        lines.push(`<td align="right">${file.coveredLines}</td>`)
        lines.push(`<td align="right">${file.executableLines}</td>`)
        lines.push('</tr>')
      }
    }
  }

  lines.push('</table>')
  lines.forEach((line, index) => {
    lines[index] = line.replace(regExp, root)
  })
  return lines
}
