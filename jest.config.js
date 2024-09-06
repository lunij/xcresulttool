export default {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  },
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testTimeout: 60000,
  verbose: true
}
