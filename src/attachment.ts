import * as fs from 'fs'
import * as path from 'path'

import { Dimensions } from './dimensions.js'
import { imageSize } from 'image-size'
import { XCResultTool } from './xcresulttool.js'
import { ActionTestAttachment } from '../dev/@types/ActionTestActivitySummary.js'

export class Attachment {
  actionTestAttachment: ActionTestAttachment
  link: string
  dimensions?: Dimensions

  constructor(actionTestAttachment: ActionTestAttachment, link: string, dimensions?: Dimensions) {
    this.actionTestAttachment = actionTestAttachment
    this.link = link
    this.dimensions = dimensions
  }
}

export async function exportAttachments(
  attachments: ActionTestAttachment[],
  xcResultPath: string
): Promise<Attachment[]> {
  const mappedAttachments = await Promise.all(
    attachments.map(async attachment => {
      return await exportAttachment(attachment, xcResultPath)
    })
  )
  const exportedAttachments = mappedAttachments.filter(
    (attachment): attachment is Attachment => attachment !== undefined
  )
  return Promise.resolve(exportedAttachments)
}

export async function exportAttachment(
  attachment: ActionTestAttachment,
  xcResultPath: string
): Promise<Attachment | undefined> {
  if (!attachment.filename || !attachment.payloadRef) {
    return Promise.resolve(undefined)
  }
  const attachmentFolderPath = path.join(process.env.GITHUB_WORKSPACE ?? '', 'attachments')
  fs.mkdirSync(attachmentFolderPath, { recursive: true })
  const attachmentPath = path.join(attachmentFolderPath, attachment.filename)
  const attachmentData = await XCResultTool.export(
    xcResultPath,
    attachmentPath,
    attachment.payloadRef.id
  )
  try {
    const dimensions = imageSize(attachmentData)
    return Promise.resolve(new Attachment(attachment, attachmentPath, dimensions))
  } catch {
    return Promise.resolve(new Attachment(attachment, attachmentPath))
  }
}
