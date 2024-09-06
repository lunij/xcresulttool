import { exec } from '@actions/exec'

export class XCCov {
  static async viewCodeCoverage(xcResultPath: string): Promise<string> {
    const args = ['xccov', 'view', '--report', '--json', xcResultPath]

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
}
