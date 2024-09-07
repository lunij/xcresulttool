import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { XCResultTool } from '../src/xcresulttool.js'
import { exec } from '@actions/exec'
import { promises } from 'fs'
const { readFile } = promises

jest.mock('@actions/exec', () => ({
  exec: jest.fn()
}))

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}))

describe('XCResultTool', () => {
  describe('version', () => {
    it('should return the version and format version', async () => {
      const mockExec = exec as jest.MockedFunction<typeof exec>

      let stdoutCallback: (data: Buffer) => void = () => {}
      mockExec.mockImplementationOnce((cmd, args, options) => {
        stdoutCallback = options?.listeners?.stdout as (data: Buffer) => void
        stdoutCallback(Buffer.from('xcresulttool version 23025, format version 3.53 (current)'))
        return Promise.resolve(0)
      })

      const result = await XCResultTool.version()

      expect(result).toEqual({
        version: '23025',
        formatVersion: '3.53'
      })

      expect(mockExec).toHaveBeenCalledWith(
        'xcrun',
        ['xcresulttool', 'version'],
        expect.any(Object)
      )
    })

    it('should throw an error if the version string is not in the expected format', async () => {
      const mockExec = exec as jest.MockedFunction<typeof exec>

      mockExec.mockImplementationOnce((cmd, args, options) => {
        const stdoutCallback = options?.listeners?.stdout as (data: Buffer) => void
        stdoutCallback(Buffer.from('invalid version string'))
        return Promise.resolve(0)
      })

      await expect(XCResultTool.version()).rejects.toThrow('Failed to parse version string')
    })
  })

  describe('json', () => {
    it('should return the JSON data without a reference and without --legacy when version is <= 3.49', async () => {
      const mockExec = exec as jest.MockedFunction<typeof exec>

      jest.spyOn(XCResultTool, 'version').mockResolvedValue({
        version: '23025',
        formatVersion: '3.49'
      })

      let stdoutCallback: (data: Buffer) => void = () => {}
      mockExec.mockImplementationOnce((cmd, args, options) => {
        stdoutCallback = options?.listeners?.stdout as (data: Buffer) => void
        stdoutCallback(Buffer.from('{"key": "value"}'))
        return Promise.resolve(0)
      })

      const result = await XCResultTool.json('/path/to/bundle')

      expect(result).toBe('{"key": "value"}')

      expect(mockExec).toHaveBeenCalledWith(
        'xcrun',
        ['xcresulttool', 'get', '--path', '/path/to/bundle', '--format', 'json'],
        expect.any(Object)
      )
    })

    it('should return the JSON data with --legacy when format version is > 3.49', async () => {
      const mockExec = exec as jest.MockedFunction<typeof exec>

      jest.spyOn(XCResultTool, 'version').mockResolvedValue({
        version: '23025',
        formatVersion: '3.50'
      })

      let stdoutCallback: (data: Buffer) => void = () => {}
      mockExec.mockImplementationOnce((cmd, args, options) => {
        stdoutCallback = options?.listeners?.stdout as (data: Buffer) => void
        stdoutCallback(Buffer.from('{"key": "value"}'))
        return Promise.resolve(0)
      })

      const result = await XCResultTool.json('/path/to/bundle')

      expect(result).toBe('{"key": "value"}')

      expect(mockExec).toHaveBeenCalledWith(
        'xcrun',
        ['xcresulttool', 'get', '--path', '/path/to/bundle', '--format', 'json', '--legacy'],
        expect.any(Object)
      )
    })

    it('should return the JSON data with a reference and --legacy when version is > 3.49', async () => {
      const mockExec = exec as jest.MockedFunction<typeof exec>

      jest.spyOn(XCResultTool, 'version').mockResolvedValue({
        version: '23025',
        formatVersion: '3.50'
      })

      let stdoutCallback: (data: Buffer) => void = () => {}
      mockExec.mockImplementationOnce((cmd, args, options) => {
        stdoutCallback = options?.listeners?.stdout as (data: Buffer) => void
        stdoutCallback(Buffer.from('{"key": "value"}'))
        return Promise.resolve(0)
      })

      const result = await XCResultTool.json('/path/to/bundle', 'ref123')

      expect(result).toBe('{"key": "value"}')

      expect(mockExec).toHaveBeenCalledWith(
        'xcrun',
        [
          'xcresulttool',
          'get',
          '--path',
          '/path/to/bundle',
          '--format',
          'json',
          '--id',
          'ref123',
          '--legacy'
        ],
        expect.any(Object)
      )
    })
  })

  describe('export', () => {
    describe('with format version <= 3.49', () => {
      beforeEach(() => {
        jest.spyOn(XCResultTool, 'version').mockResolvedValue({
          version: '23025',
          formatVersion: '3.49'
        })
      })

      it('should export to the specified file', async () => {
        const mockExec = exec as jest.MockedFunction<typeof exec>
        const mockReadFile = readFile as jest.MockedFunction<typeof readFile>

        mockExec.mockResolvedValueOnce(0)

        const fileContent = 'mock file content'
        mockReadFile.mockResolvedValueOnce(Buffer.from(fileContent))

        const result = await XCResultTool.export('/path/to/xcresult', '/path/to/output', 'ref123')

        expect(result).toEqual(Buffer.from(fileContent))

        expect(mockExec).toHaveBeenCalledWith(
          'xcrun',
          [
            'xcresulttool',
            'export',
            '--type',
            'file',
            '--path',
            '/path/to/xcresult',
            '--output-path',
            '/path/to/output',
            '--id',
            'ref123'
          ],
          expect.any(Object)
        )

        expect(mockReadFile).toHaveBeenCalledWith('/path/to/output')
      })

      it('should handle the case where the export fails and throw an error', async () => {
        jest.spyOn(XCResultTool, 'version').mockResolvedValue({
          version: '23025',
          formatVersion: '3.49'
        })

        const mockExec = exec as jest.MockedFunction<typeof exec>
        const mockReadFile = readFile as jest.MockedFunction<typeof readFile>

        mockExec.mockRejectedValueOnce(new Error('Command failed'))

        await expect(
          XCResultTool.export('/path/to/xcresult', '/path/to/output', 'ref123')
        ).rejects.toThrow('Command failed')

        expect(mockReadFile).not.toHaveBeenCalled()
      })

      it('should throw an error if reading the output file fails', async () => {
        jest.spyOn(XCResultTool, 'version').mockResolvedValue({
          version: '23025',
          formatVersion: '3.49'
        })

        const mockExec = exec as jest.MockedFunction<typeof exec>
        const mockReadFile = readFile as jest.MockedFunction<typeof readFile>

        mockExec.mockResolvedValueOnce(0)

        mockReadFile.mockRejectedValueOnce(new Error('File read error'))

        await expect(
          XCResultTool.export('/path/to/xcresult', '/path/to/output', 'ref123')
        ).rejects.toThrow('File read error')

        expect(mockExec).toHaveBeenCalledWith(
          'xcrun',
          [
            'xcresulttool',
            'export',
            '--type',
            'file',
            '--path',
            '/path/to/xcresult',
            '--output-path',
            '/path/to/output',
            '--id',
            'ref123'
          ],
          expect.any(Object)
        )
      })
    })

    describe('with format version 3.50+', () => {
      beforeEach(() => {
        jest.spyOn(XCResultTool, 'version').mockResolvedValue({
          version: '23025',
          formatVersion: '3.50'
        })
      })

      it('should export to the specified file using --legacy arg', async () => {
        const mockExec = exec as jest.MockedFunction<typeof exec>
        const mockReadFile = readFile as jest.MockedFunction<typeof readFile>

        mockExec.mockResolvedValueOnce(0)

        const fileContent = 'mock file content'
        mockReadFile.mockResolvedValueOnce(Buffer.from(fileContent))

        const result = await XCResultTool.export('/path/to/xcresult', '/path/to/output', 'ref123')

        expect(result).toEqual(Buffer.from(fileContent))

        expect(mockExec).toHaveBeenCalledWith(
          'xcrun',
          [
            'xcresulttool',
            'export',
            '--type',
            'file',
            '--path',
            '/path/to/xcresult',
            '--output-path',
            '/path/to/output',
            '--id',
            'ref123',
            '--legacy'
          ],
          expect.any(Object)
        )

        expect(mockReadFile).toHaveBeenCalledWith('/path/to/output')
      })
    })
  })
})
