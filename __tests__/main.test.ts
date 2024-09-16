import * as github from '@actions/github'
import * as os from 'os'
import * as path from 'path'
import * as process from 'process'
import { expect, test } from '@jest/globals'
import { promises } from 'fs'
const { readFile, writeFile } = promises
import { Formatter } from '../src/formatter.js'

const record = false

test('Netbob.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/Netbob.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format({
    showCodeCoverage: true,
    showFileCoverage: true,
    showPassedTests: false,
    showTestSummaries: true
  })
  const reportText = report.reportSummary.removeGithubRootUrl()

  const outputPath = path.join(os.tmpdir(), 'Netbob.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/Netbob.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/Netbob.md')).toString()
  )
})

test('MultipleLibraries.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/MultipleLibraries.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format({
    showCodeCoverage: true,
    showFileCoverage: false,
    showPassedTests: false,
    showTestSummaries: false
  })
  const reportText = report.reportSummary.removeGithubRootUrl()

  const outputPath = path.join(os.tmpdir(), 'MultipleLibraries.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/MultipleLibraries.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/MultipleLibraries.md')).toString()
  )
})

test('Weather.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/Weather.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'Weather.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/Weather.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/Weather.md')).toString()
  )
})

test('Weather.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/Weather.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format({
    showPassedTests: false,
    showCodeCoverage: true,
    showFileCoverage: true,
    showTestSummaries: true
  })
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'WeatherFailuresOnly.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/WeatherFailuresOnly.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/WeatherFailuresOnly.md')).toString()
  )
})

test('KeychainAccess.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/KeychainAccess.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'KeychainAccess.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/KeychainAccess.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/KeychainAccess.md')).toString()
  )
})

test('KeychainAccess.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/KeychainAccess.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format({
    showPassedTests: false,
    showCodeCoverage: true,
    showFileCoverage: true,
    showTestSummaries: true
  })
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'KeychainAccessOnlyFailures.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/KeychainAccessOnlyFailures.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/KeychainAccessOnlyFailures.md')).toString()
  )
})

test('TAU.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/TAU.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'TAU.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/TAU.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/TAU.md')).toString()
  )
})

test('Merged.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/Merged.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'Merged.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/Merged.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/Merged.md')).toString()
  )
})

test('Spaceship.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/Spaceship.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'Spaceship.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/Spaceship.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/Spaceship.md')).toString()
  )
})

test('TestResults.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/TestResults.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'TestResults.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/TestResults.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/TestResults.md')).toString()
  )
})

test('UhooiPicBook.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/UhooiPicBook.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary.removeGithubRootUrl()

  const outputPath = path.join(os.tmpdir(), 'UhooiPicBook.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/UhooiPicBook.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/UhooiPicBook.md')).toString()
  )
})

test('Attachment.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/Attachment.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'Attachment.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/Attachment.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/Attachment.md')).toString()
  )
})

test('Coverage.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/Coverage.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary.removeGithubRootUrl()

  const outputPath = path.join(os.tmpdir(), 'Coverage.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/Coverage.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/Coverage.md')).toString()
  )
})

test('Coverage.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/Coverage.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format({
    showPassedTests: true,
    showCodeCoverage: false,
    showFileCoverage: true,
    showTestSummaries: true
  })
  const reportText = report.reportSummary.removeGithubRootUrl()

  const outputPath = path.join(os.tmpdir(), 'HideCodeCoverage.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/HideCodeCoverage.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/HideCodeCoverage.md')).toString()
  )
})

test('BuildError.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/BuildError.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'BuildError.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/BuildError.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/BuildError.md')).toString()
  )
})

test('LinkError.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/LinkError.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary

  const outputPath = path.join(os.tmpdir(), 'LinkError.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/LinkError.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/LinkError.md')).toString()
  )
})

test('NoTests.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/NoTests.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary.removeGithubRootUrl()

  const outputPath = path.join(os.tmpdir(), 'NoTests.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/NoTests.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/NoTests.md')).toString()
  )
})

test('TestResults#669.xcresult', async () => {
  const bundlePath = '__tests__/fixtures/TestResults#669.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = report.reportSummary.removeGithubRootUrl()

  const outputPath = path.join(os.tmpdir(), 'NoTests.md')
  await writeFile(outputPath, reportText)
  if (record) {
    await writeFile('__tests__/fixtures/TestResults#669.md', reportText)
  }
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/fixtures/TestResults#669.md')).toString()
  )
})

function getGithubRootUrl(): string {
  let root = ''
  if (process.env.GITHUB_REPOSITORY) {
    const pr = github.context.payload.pull_request
    const sha = (pr && pr.head.sha) || github.context.sha
    root = `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/blob/${sha}/`
  }
  return root
}

declare global {
  interface String {
    removeGithubRootUrl(): string
  }
}

String.prototype.removeGithubRootUrl = function (): string {
  const root = getGithubRootUrl()
  const re = new RegExp(`${root}`, 'g')
  return this.replace(re, '')
}
