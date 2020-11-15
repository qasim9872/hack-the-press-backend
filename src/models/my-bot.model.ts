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
import { IntentAnswerPair, TwimlConfig } from "./intent-answer-pair"
import Boom from "boom"

// This is to allow nested objects
setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })

export interface MyBot {
  name: string
  details: string
  phoneNumbers: string[]
  intentAnswerPairs: IntentAnswerPair[]
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
  public intentAnswerPairs: IntentAnswerPair[] = []

  public static async findByPhoneNumber(this: ReturnModelType<typeof MyBot>, phoneNumber: string) {
    return this.findOne({ phoneNumbers: phoneNumber }).exec()
  }

  public findIntent(this: DocumentType<MyBot>, intent: string) {
    return this.intentAnswerPairs.find((intentAnswerPair: IntentAnswerPair) => intentAnswerPair.intent === intent)
  }

  public async addIntent(this: DocumentType<MyBot>, intent: string) {
    if (this.findIntent(intent)) {
      throw new Boom(`intent: ${intent} already exists`)
    }

    const intentAnswerPair: IntentAnswerPair = {
      intent: intent,
      response: [],
    }

    this.intentAnswerPairs.push(intentAnswerPair)
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

    const intentAnswerPair = this.findIntent(intent)
    if (!intentAnswerPair) {
      throw new Boom(`intentAnswerPair not found for ${intent}`)
    }

    if (set) {
      intentAnswerPair.response = response
    } else {
      intentAnswerPair.response.push(...response)
    }

    if (config) {
      intentAnswerPair.config = config
    }

    this.markModified("intentAnswerPairs")

    return this.save()
  }
}

export const MyBotModel = getModelForClass(MyBot)
