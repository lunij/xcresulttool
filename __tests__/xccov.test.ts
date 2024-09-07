import { describe, expect, it, jest } from '@jest/globals'
import { XCCov } from '../src/xccov.js'
import { exec } from '@actions/exec'

jest.mock('@actions/exec')

describe('XCCov', () => {
  describe('viewCodeCoverage', () => {
    it('should return the code coverage report as a string', async () => {
      const mockExec = exec as jest.MockedFunction<typeof exec>

      let stdoutCallback: (data: Buffer) => void = () => {}
      mockExec.mockImplementationOnce((cmd, args, options) => {
        stdoutCallback = options?.listeners?.stdout as (data: Buffer) => void
        stdoutCallback(Buffer.from('{"coverage": 85.5}'))
        return Promise.resolve(0)
      })

      const result = await XCCov.viewCodeCoverage('/path/to/xcresult')

      expect(result).toBe('{"coverage": 85.5}')

      expect(mockExec).toHaveBeenCalledWith(
        'xcrun',
        ['xccov', 'view', '--report', '--json', '/path/to/xcresult'],
        expect.any(Object)
      )
    })

    it('should handle an empty output', async () => {
      const mockExec = exec as jest.MockedFunction<typeof exec>

      mockExec.mockImplementationOnce((cmd, args, options) => {
        const stdoutCallback = options?.listeners?.stdout as (data: Buffer) => void
        stdoutCallback(Buffer.from(''))
        return Promise.resolve(0)
      })

      const result = await XCCov.viewCodeCoverage('/path/to/xcresult')

      expect(result).toBe('')

      expect(mockExec).toHaveBeenCalledWith(
        'xcrun',
        ['xccov', 'view', '--report', '--json', '/path/to/xcresult'],
        expect.any(Object)
      )
    })

    it('should throw an error if the command fails', async () => {
      const mockExec = exec as jest.MockedFunction<typeof exec>

      mockExec.mockRejectedValueOnce(new Error('Command failed'))

      await expect(XCCov.viewCodeCoverage('/path/to/xcresult')).rejects.toThrow('Command failed')

      expect(mockExec).toHaveBeenCalledWith(
        'xcrun',
        ['xccov', 'view', '--report', '--json', '/path/to/xcresult'],
        expect.any(Object)
      )
    })
  })
})
