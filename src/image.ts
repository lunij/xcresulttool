const baseUrl = 'https://xcresulttool-static.netlify.app/i/'

function testStatusImage(statusText: string): string {
  let filename = ''
  switch (statusText) {
    case 'Success':
      filename = 'passed.png'
      break
    case 'Failure':
      filename = 'failure.png'
      break
    case 'Skipped':
      filename = 'skipped.png'
      break
    case 'Mixed Success':
      filename = 'mixed-passed.png'
      break
    case 'Mixed Failure':
      filename = 'mixed-failure.png'
      break
    case 'Expected Failure':
      filename = 'expected-failure.png'
      break
    default:
      filename = 'unknown.png'
      break
  }
  return `<img src="${baseUrl}${filename}" alt="${statusText}" title="${statusText}" width="14px" align="top">`
}

export function coverageBarImage(percentage: number): string {
  return `<img src="${baseUrl}${percentage.toFixed(0)}.svg"/>`
}

export const passedImage = testStatusImage('Success')
export const failedImage = testStatusImage('Failure')
export const skippedImage = testStatusImage('Skipped')
export const expectedFailureImage = testStatusImage('Expected Failure')
