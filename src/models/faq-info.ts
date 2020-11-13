import { prop } from "@typegoose/typegoose"

export interface FaqInfo {
    intent: string
    response: string[]
}

export class FaqInfo implements FaqInfo {
    @prop({ required: true, default: [] })
    public intent!: string

    @prop({ required: true, default: [] })
    public response!: string[]
}
