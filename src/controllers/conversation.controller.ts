import { classify } from "./nlp.controller"
import { MyBotModel } from "../models/my-bot.model"
import { sayText } from "./twilio.controller"

export async function process(from: string, to: string, callId: string) {
    return sayText(`hello there`)
}
