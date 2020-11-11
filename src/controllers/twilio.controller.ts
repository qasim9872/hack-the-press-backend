import { ACCOUNT_SID, AUTH_TOKEN } from "@config/twilio.config"
import twilio from "twilio"

const VoiceResponse = twilio.twiml.VoiceResponse
export const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

export function sayText(text: string) {
    const twiml = new VoiceResponse()

    twiml.say(
        {
            voice: "Polly.Amy",
            language: "en-GB",
        },
        text
    )

    return twiml.toString()
}
