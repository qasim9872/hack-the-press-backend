import timestamps from "mongoose-timestamp"
import {
    plugin,
    prop,
    getModelForClass,
    ReturnModelType,
    DocumentType,
    setGlobalOptions,
    Severity,
} from "@typegoose/typegoose"
import { FaqInfo, TwimlConfig } from "./faq-info"
import Boom from "boom"

// This is to allow nested objects
setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })

export interface MyBot {
    name: string
    details: string
    phoneNumbers: string[]
    faqMap: FaqInfo[]
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

    public static async findByPhoneNumber(this: ReturnModelType<typeof MyBot>, phoneNumber: string) {
        return this.findOne({ phoneNumbers: phoneNumber }).exec()
    }

    public findIntent(this: DocumentType<MyBot>, intent: string) {
        return this.faqMap.find((faq) => faq.intent === intent)
    }

    public async addIntent(this: DocumentType<MyBot>, intent: string) {
        if (this.findIntent(intent)) {
            throw new Boom(`intent: ${intent} already exists`)
        }

        const faq: FaqInfo = {
            intent: intent,
            response: [],
        }

        this.faqMap.push(faq)
        return this.save()
    }

    public async addResponse(
        this: DocumentType<MyBot>,
        intent: string,
        response: string[],
        config?: TwimlConfig,
        create = true,
        set = false
    ) {
        if (!this.findIntent(intent) && create) {
            await this.addIntent(intent)
        }

        const faq = this.findIntent(intent)
        if (!faq) {
            throw new Boom(`FAQ not found for ${intent}`)
        }

        if (set) {
            faq.response = response
        } else {
            faq.response.push(...response)
        }

        if (config) {
            faq.config = config
        }

        this.markModified("faqMap")

        return this.save()
    }
}

export const MyBotModel = getModelForClass(MyBot)
