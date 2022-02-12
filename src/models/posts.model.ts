import timestamps from "mongoose-timestamp"
import { plugin, prop, getModelForClass, ReturnModelType, setGlobalOptions, Severity } from "@typegoose/typegoose"

// This is to allow nested objects
setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })

export interface Posts {
  name: string
  text: string
}

@plugin(timestamps)
export class MyBot implements MyBot {
  @prop({ required: true })
  public name!: string

  @prop({ required: true })
  public text!: string

  public static async findByPhoneNumber(this: ReturnModelType<typeof MyBot>, phoneNumber: string) {
    return this.findOne({ phoneNumbers: phoneNumber }).exec()
  }
}

export const MyBotModel = getModelForClass(MyBot)
