import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { exportAttachments, exportAttachment, Attachment } from '../src/attachment.js'
import { XCResultTool } from '../src/xcresulttool.js'
import { ActionTestAttachment } from '../dev/@types/ActionTestActivitySummary.js'

jest.mock('image-size', () => ({
  imageSize: jest.fn(() => ({ width: 100, height: 100 }))
}))

jest.mock('fs', () => {
  const originalModule = jest.requireActual('fs')
  return {
    __esModule: true,
    //@ts-ignore
    ...originalModule,
    mkdirSync: () => 'mkdirSyncMock'
  }
})

jest.mock('os', () => {
  const originalModule = jest.requireActual('os')
  return {
    __esModule: true,
    //@ts-ignore
    ...originalModule,
    tmpdir: () => '/tmp'
  }
})

describe('exportAttachments', () => {
  const mockAttachments: ActionTestAttachment[] = [
    {
      uniformTypeIdentifier: '1234567890',
      lifetime: 'fakeLifetime',
      inActivityIdentifier: 123,
      filename: 'test.png',
      payloadRef: { id: 'payload123' },
      payloadSize: 456
    }
  ]
  const xcResultPath = '/path/to/xcresult'

  beforeEach(() => {
    jest.spyOn(XCResultTool, 'export').mockResolvedValue(Buffer.from('fakeImageData'))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return an array of Attachment objects', async () => {
    const exportedAttachments = await exportAttachments(mockAttachments, xcResultPath)

    expect(exportedAttachments).toHaveLength(1)
    expect(exportedAttachments[0]).toBeInstanceOf(Attachment)
    expect(exportedAttachments[0].link).toBe('/tmp/attachments/test.png')
    expect(exportedAttachments[0].dimensions).toEqual({ width: 100, height: 100 })
  })

  it('should filter out undefined attachments', async () => {
    const mockAttachmentsUnfiltered: ActionTestAttachment[] = [
      ...mockAttachments,
      {
        uniformTypeIdentifier: '1234567890',
        lifetime: 'fakeLifetime',
        inActivityIdentifier: 123,
        filename: undefined,
        payloadRef: undefined,
        payloadSize: 456
      }
    ]

    const exportedAttachments = await exportAttachments(mockAttachmentsUnfiltered, xcResultPath)

    expect(exportedAttachments).toHaveLength(1)
    expect(exportedAttachments[0].link).toBe('/tmp/attachments/test.png')
  })

  it('should not fail when input attachments are empty', async () => {
    const exportedAttachments = await exportAttachments([], xcResultPath)

    expect(exportedAttachments).toHaveLength(0)
  })
})

describe('exportAttachment', () => {
  const mockAttachment: ActionTestAttachment = {
    uniformTypeIdentifier: '1234567890',
    lifetime: 'fakeLifetime',
    inActivityIdentifier: 123,
    filename: 'test.png',
    payloadRef: { id: 'payload123' },
    payloadSize: 456
  }
  const xcResultPath = '/path/to/xcresult'

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return an Attachment object if valid attachment is provided', async () => {
    const exportedAttachment = await exportAttachment(mockAttachment, xcResultPath)

    expect(exportedAttachment).toBeInstanceOf(Attachment)
    expect(exportedAttachment?.link).toBe('/tmp/attachments/test.png')
    expect(exportedAttachment?.dimensions).toEqual({ width: 100, height: 100 })
  })

  it('should return undefined if filename or payloadRef is missing', async () => {
    const invalidAttachment: ActionTestAttachment = {
      uniformTypeIdentifier: '1234567890',
      lifetime: 'fakeLifetime',
      inActivityIdentifier: 123,
      filename: undefined,
      payloadRef: undefined,
      payloadSize: 456
    }

    const exportedAttachment = await exportAttachment(invalidAttachment, xcResultPath)

    expect(exportedAttachment).toBeUndefined()
  })
})
