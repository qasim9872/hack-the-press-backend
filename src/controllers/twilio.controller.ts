import { ACCOUNT_SID, AUTH_TOKEN, TTS_ATTRIBUTES } from "@config/twilio.config"
import twilio from "twilio"

const VoiceResponse = twilio.twiml.VoiceResponse
export const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

export function sayText(text: string, attributes = TTS_ATTRIBUTES) {
    const twiml = new VoiceResponse()

    twiml.say(attributes, text)

    return twiml.toString()
}
