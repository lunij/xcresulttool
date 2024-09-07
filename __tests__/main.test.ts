import * as github from '@actions/github'
import * as os from 'os'
import * as path from 'path'
import * as process from 'process'
import { expect, test } from '@jest/globals'
import { promises } from 'fs'
const { readFile, writeFile } = promises
import { Formatter, FormatterOptions } from '../src/formatter.js'

test('Example.xcresult', async () => {
  const bundlePath = '__tests__/data/Example.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'Example.md')
  await writeFile(outputPath, reportText)
  // await writeFile('Example.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/Example.md')).toString()
  )
})

test('Example.xcresult', async () => {
  const bundlePath = '__tests__/data/Example.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format({
    showPassedTests: false,
    showCodeCoverage: true,
    showTestSummaries: true,
    showTestDetails: true
  })
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'ExampleOnlyFailures.md')
  await writeFile(outputPath, reportText)
  // await writeFile('ExampleOnlyFailures.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/ExampleOnlyFailures.md')).toString()
  )
})

test('KeychainAccess.xcresult', async () => {
  const bundlePath = '__tests__/data/KeychainAccess.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'KeychainAccess.md')
  await writeFile(outputPath, reportText)
  // await writeFile('KeychainAccess.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/KeychainAccess.md')).toString()
  )
})

test('KeychainAccess.xcresult', async () => {
  const bundlePath = '__tests__/data/KeychainAccess.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format({
    showPassedTests: false,
    showCodeCoverage: true,
    showTestSummaries: true,
    showTestDetails: true
  })
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'KeychainAccessOnlyFailures.md')
  await writeFile(outputPath, reportText)
  // await writeFile('KeychainAccessOnlyFailures.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/KeychainAccessOnlyFailures.md')).toString()
  )
})

test('TAU.xcresult', async () => {
  const bundlePath = '__tests__/data/TAU.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'TAU.md')
  await writeFile(outputPath, reportText)
  // await writeFile('TAU.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/TAU.md')).toString()
  )
})

test('Merged.xcresult', async () => {
  const bundlePath = '__tests__/data/Merged.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'Merged.md')
  await writeFile(outputPath, reportText)
  // await writeFile('Merged.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/Merged.md')).toString()
  )
})

test('Spaceship.xcresult', async () => {
  const bundlePath = '__tests__/data/Spaceship.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'Spaceship.md')
  await writeFile(outputPath, reportText)
  // await writeFile('Spaceship.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/Spaceship.md')).toString()
  )
})

test('TestResults.xcresult', async () => {
  const bundlePath = '__tests__/data/TestResults.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'TestResults.md')
  await writeFile(outputPath, reportText)
  // await writeFile('TestResults.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/TestResults.md')).toString()
  )
})

test('UhooiPicBook.xcresult', async () => {
  const bundlePath = '__tests__/data/UhooiPicBook.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()

  let root = ''
  if (process.env.GITHUB_REPOSITORY) {
    const pr = github.context.payload.pull_request
    const sha = (pr && pr.head.sha) || github.context.sha
    root = `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/blob/${sha}/`
  }
  const re = new RegExp(`${root}`, 'g')
  const reportText = `${report.reportSummary}\n${report.reportDetail}`.replace(
    re,
    ''
  )

  const outputPath = path.join(os.tmpdir(), 'UhooiPicBook.md')
  await writeFile(outputPath, reportText)
  // await writeFile('UhooiPicBook.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/UhooiPicBook.md')).toString()
  )
})

test('Attachment.xcresult', async () => {
  const bundlePath = '__tests__/data/Attachment.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'Attachment.md')
  await writeFile(outputPath, reportText)
  // await writeFile('Attachment.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/Attachment.md')).toString()
  )
})

test('Coverage.xcresult', async () => {
  const bundlePath = '__tests__/data/Coverage.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()

  let root = ''
  if (process.env.GITHUB_REPOSITORY) {
    const pr = github.context.payload.pull_request
    const sha = (pr && pr.head.sha) || github.context.sha
    root = `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/blob/${sha}/`
  }
  const re = new RegExp(`${root}`, 'g')
  const reportText = `${report.reportSummary}\n${report.reportDetail}`.replace(
    re,
    ''
  )

  const outputPath = path.join(os.tmpdir(), 'Coverage.md')
  await writeFile(outputPath, reportText)
  // await writeFile('Coverage.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/Coverage.md')).toString()
  )
})

test('Coverage.xcresult', async () => {
  const bundlePath = '__tests__/data/Coverage.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format({
    showPassedTests: true,
    showCodeCoverage: false,
    showTestSummaries: true,
    showTestDetails: true
  })

  let root = ''
  if (process.env.GITHUB_REPOSITORY) {
    const pr = github.context.payload.pull_request
    const sha = (pr && pr.head.sha) || github.context.sha
    root = `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/blob/${sha}/`
  }
  const re = new RegExp(`${root}`, 'g')
  const reportText = `${report.reportSummary}\n${report.reportDetail}`.replace(
    re,
    ''
  )

  const outputPath = path.join(os.tmpdir(), 'HideCodeCoverage.md')
  await writeFile(outputPath, reportText)
  // await writeFile('HideCodeCoverage.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/HideCodeCoverage.md')).toString()
  )
})

test('BuildError.xcresult', async () => {
  const bundlePath = '__tests__/data/BuildError.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'BuildError.md')
  await writeFile(outputPath, reportText)
  // await writeFile('BuildError.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/BuildError.md')).toString()
  )
})

test('LinkError.xcresult', async () => {
  const bundlePath = '__tests__/data/LinkError.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()
  const reportText = `${report.reportSummary}\n${report.reportDetail}`

  const outputPath = path.join(os.tmpdir(), 'LinkError.md')
  await writeFile(outputPath, reportText)
  // await writeFile('LinkError.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/LinkError.md')).toString()
  )
})

test('NoTests.xcresult', async () => {
  const bundlePath = '__tests__/data/NoTests.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()

  let root = ''
  if (process.env.GITHUB_REPOSITORY) {
    const pr = github.context.payload.pull_request
    const sha = (pr && pr.head.sha) || github.context.sha
    root = `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/blob/${sha}/`
  }
  const re = new RegExp(`${root}`, 'g')
  const reportText = `${report.reportSummary}\n${report.reportDetail}`.replace(
    re,
    ''
  )

  const outputPath = path.join(os.tmpdir(), 'NoTests.md')
  await writeFile(outputPath, reportText)
  // await writeFile('NoTests.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/NoTests.md')).toString()
  )
})

test('TestResults#669.xcresult', async () => {
  const bundlePath = '__tests__/data/TestResults#669.xcresult'
  const formatter = new Formatter(bundlePath)
  const report = await formatter.format()

  let root = ''
  if (process.env.GITHUB_REPOSITORY) {
    const pr = github.context.payload.pull_request
    const sha = (pr && pr.head.sha) || github.context.sha
    root = `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}/blob/${sha}/`
  }
  const re = new RegExp(`${root}`, 'g')
  const reportText = `${report.reportSummary}\n${report.reportDetail}`.replace(
    re,
    ''
  )

  const outputPath = path.join(os.tmpdir(), 'NoTests.md')
  await writeFile(outputPath, reportText)
  // await writeFile('TestResults#669.md', reportText)
  expect((await readFile(outputPath)).toString()).toBe(
    (await readFile('__tests__/data/TestResults#669.md')).toString()
  )
})
