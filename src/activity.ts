import { ActionTestActivitySummary } from '../dev/@types/ActionTestActivitySummary.d.js'
import { Attachment } from './attachment.js'

export class Activity {
  activitySummary: ActionTestActivitySummary
  attachments: Attachment[]
  indent: number

  constructor(
    activitySummary: ActionTestActivitySummary,
    attachments: Attachment[],
    indent: number
  ) {
    this.activitySummary = activitySummary
    this.attachments = attachments
    this.indent = indent
  }
}
