const baseUrl = 'https://raw.github.com/lunij/xcresulttool/marc/svg/images/'

function testStatusImage(statusText: string): string {
  let filename = ''
  switch (statusText) {
    case 'Success':
      filename = 'success.svg'
      break
    case 'Failure':
      filename = 'failure.svg'
      break
    case 'Skipped':
      filename = 'skipped.svg'
      break
    case 'Expected Failure':
      filename = 'expected-failure.svg'
      break
    default:
      filename = 'unknown.svg'
      break
  }
  return `<img src="${baseUrl}${filename}" align="center" />`
}

export function coverageBarImage(percentage: number): string {
  return `<img src="${baseUrl}${percentage.toFixed(0)}.svg" align="center" />`
}

export const passedImage = testStatusImage('Success')
export const failedImage = testStatusImage('Failure')
export const skippedImage = testStatusImage('Skipped')
export const expectedFailureImage = testStatusImage('Expected Failure')
