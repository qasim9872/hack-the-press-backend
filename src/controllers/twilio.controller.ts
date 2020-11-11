import { ACCOUNT_SID, AUTH_TOKEN } from "@config/twilio.config"
import twilio from "twilio"

const VoiceResponse = twilio.twiml.VoiceResponse
export const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

export function say(text: string) {
    const twiml = new VoiceResponse()

    twiml.say(text)

    return twiml.toString()
}
