import {ActionTestActivitySummary} from '../dev/@types/ActionTestActivitySummary.d.js'
import {Attachment} from './attachment.js'

export interface Activity {
  title: string
  activityType: string
  uuid: string
  start?: string
  finish?: string
  attachments: Attachment[]
  subactivities: ActionTestActivitySummary[]
  failureSummaryIDs: string[]
  expectedFailureIDs: string[]
  indent: number
}
