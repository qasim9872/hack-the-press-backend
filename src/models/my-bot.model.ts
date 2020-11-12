import timestamps from "mongoose-timestamp"
import { plugin, prop, getModelForClass } from "@typegoose/typegoose"
import { FaqInfo } from "./faq-info"

export interface MyBot {
    name: string
    details: string
    phoneNumbers: string[]
}

@plugin(timestamps)
export class MyBot implements MyBot {
    @prop({ required: true })
    public name!: string

    @prop({ required: true })
    public details!: string

    @prop({
        validate: {
            validator: function (value) {
                for (let i = 0; i < value.length; i++) {
                    if (!/^(00|\+){1}\d*$/.test(value[i])) {
                        return false
                    }
                }
                return true
            },
            message: "{VALUE} is not a valid phone number",
        },
    })
    public phoneNumbers: string[] = []

    @prop({ required: true })
    public faqMap: FaqInfo[] = []

    // TODO - add utility functions
}

export const MyBotModel = getModelForClass(MyBot)
