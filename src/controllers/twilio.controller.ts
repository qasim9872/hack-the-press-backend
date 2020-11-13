import { ACCOUNT_SID, AUTH_TOKEN, TTS_ATTRIBUTES, STT_LANGUAGE } from "@config/twilio.config"
import twilio from "twilio"

const VoiceResponse = twilio.twiml.VoiceResponse
export const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

export function sayText(text: string, attributes = TTS_ATTRIBUTES) {
    const response = new VoiceResponse()

    const gather = response.gather({
        // hints
        // action: "/speech",
        input: ["dtmf", "speech"],
        language: STT_LANGUAGE,
        speechModel: "phone_call",
        enhanced: true,
    })

    gather.say(attributes, text)

    return response.toString()
}
