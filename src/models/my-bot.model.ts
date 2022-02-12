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
import Boom from "boom"

// This is to allow nested objects
setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })

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

  public static async findByPhoneNumber(this: ReturnModelType<typeof MyBot>, phoneNumber: string) {
    return this.findOne({ phoneNumbers: phoneNumber }).exec()
  }
}

export const MyBotModel = getModelForClass(MyBot)
