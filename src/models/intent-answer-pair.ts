import { prop } from "@typegoose/typegoose"

// Window for transferring calls
// Denoted with hours eg 19, 23, 08
export interface TransferWindow {
  start: number
  end: number
}

export interface TransferPreferences {
  transferTarget?: string
  transferWindow?: TransferWindow
}

export interface TwimlConfig {
  transfer?: boolean
  transferPreferences?: TransferPreferences
  hangup?: boolean
}

export interface IntentAnswerPair {
  intent: string
  response: string[]
  config?: TwimlConfig
}

export class IntentAnswerPair implements IntentAnswerPair {
  @prop({ required: true, default: [] })
  public intent!: string

  @prop({ required: true, default: [] })
  public response!: string[]

  @prop({ required: false })
  public config?: TwimlConfig
}
