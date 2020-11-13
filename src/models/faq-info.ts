import { prop } from "@typegoose/typegoose"

export interface TwimlConfig {
    transfer?: string
    hangup?: boolean
}

export interface FaqInfo {
    intent: string
    response: string[]
    config?: TwimlConfig
}

export class FaqInfo implements FaqInfo {
    @prop({ required: true, default: [] })
    public intent!: string

    @prop({ required: true, default: [] })
    public response!: string[]

    @prop({ required: false })
    public config?: TwimlConfig
}
