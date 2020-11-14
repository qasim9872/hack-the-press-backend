import { prop } from "@typegoose/typegoose"

export interface TransferPreferences {
    transferTarget?: string
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
