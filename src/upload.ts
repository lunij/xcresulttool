import * as archiver from 'archiver'
import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'
import { DefaultArtifactClient } from '@actions/artifact'
import { glob } from 'glob'
import { TestStatus } from './report.js'
const { stat } = fs.promises

export async function uploadBundlesAsArtifacts(
  xcResultPaths: string[],
  option: string,
  testStatus: TestStatus
) {
  if (option !== 'always' && !(option === 'failure' && testStatus === 'failure')) {
    return
  }
  for (const xcResultPath of xcResultPaths) {
    try {
      await stat(xcResultPath)
    } catch (error) {
      continue
    }

    const artifactClient = new DefaultArtifactClient()
    const artifactName = path.basename(xcResultPath)
    const zipFilePath = `${xcResultPath}.zip`

    core.info(`XCResult: ${xcResultPath}`)
    core.info(`Zip: ${zipFilePath}`)

    try {
      const output = fs.createWriteStream(zipFilePath)
      const archive = archiver.create('zip', { zlib: { level: 9 } })

      output.on('close', function () {
        core.info(`Zipped ${archive.pointer()} total bytes.`)
      })

      archive.on('error', function (err: any) {
        throw err
      })

      archive.pipe(output)

      const files = await glob(`${xcResultPath}/**/*`)

      files.forEach(file => {
        const filePath = path.resolve(file)
        const fileName = path.join(
          path.basename(xcResultPath),
          path.relative(xcResultPath, filePath)
        )
        archive.file(filePath, { name: fileName })
      })

      await archive.finalize()

      if (fs.existsSync(zipFilePath)) {
        await artifactClient.uploadArtifact(artifactName, [zipFilePath], path.dirname(zipFilePath))
      }
    } catch (error) {
      if (error instanceof Error) {
        core.error(error.message)
      } else {
        core.error(String(error))
      }
    }
  }
}
