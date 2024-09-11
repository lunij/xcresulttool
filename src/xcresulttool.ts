import { exec } from '@actions/exec'
import { promises } from 'fs'
const { readFile } = promises

export class XCResultTool {
  static async version(): Promise<{ version: string; formatVersion: string }> {
    let output = ''

    const options = {
      silent: true,
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString()
        }
      }
    }

    await exec('xcrun', ['xcresulttool', 'version'], options)

    const versionMatch = output.match(/xcresulttool version (\d+), format version ([\d.]+)/)

    if (!versionMatch) {
      throw new Error('Failed to parse version string')
    }

    return {
      version: versionMatch[1],
      formatVersion: versionMatch[2]
    }
  }

  static async json(xcResultPath: string, reference?: string): Promise<string> {
    const versionInfo = await this.version()
    const args = ['xcresulttool', 'get', '--path', xcResultPath, '--format', 'json']

    if (reference) {
      args.push('--id')
      args.push(reference)
    }

    if (parseFloat(versionInfo.formatVersion) > 3.49) {
      args.push('--legacy')
    }

    let output = ''
    const options = {
      silent: true,
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString()
        }
      }
    }

    await exec('xcrun', args, options)
    return output
  }

  static async export(
    xcResultPath: string,
    outputPath: string,
    reference: string
  ): Promise<Buffer> {
    const versionInfo = await this.version()
    const args = [
      'xcresulttool',
      'export',
      '--type',
      'file',
      '--path',
      xcResultPath,
      '--output-path',
      outputPath,
      '--id',
      reference
    ]

    if (parseFloat(versionInfo.formatVersion) > 3.49) {
      args.push('--legacy')
    }

    const options = {
      silent: true
    }

    try {
      await exec('xcrun', args, options)
      return Buffer.from(await readFile(outputPath))
    } catch (error) {
      const command = `xcrun ${args.join(' ')}`
      throw new Error(`The command "${command}" failed with error: ${(error as Error).message}`)
    }
  }
}
