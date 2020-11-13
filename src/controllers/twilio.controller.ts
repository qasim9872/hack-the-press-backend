import { ACCOUNT_SID, AUTH_TOKEN, TTS_ATTRIBUTES, STT_LANGUAGE } from "@config/twilio.config"
import twilio from "twilio"

const VoiceResponse = twilio.twiml.VoiceResponse
export const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

export function sayText(text: string, hangup: boolean, attributes = TTS_ATTRIBUTES) {
    const response = new VoiceResponse()

    response.say(attributes, text)

    if (hangup) {
        response.hangup()
    } else {
        response.gather({
            // hints
            // action: "/speech",
            input: ["dtmf", "speech"],
            language: STT_LANGUAGE,
            speechModel: "phone_call",
            enhanced: true,
            // timeout: 2, // the callback will be triggered after silence for this amount of time
            speechTimeout: "auto",
            actionOnEmptyResult: true, // this ensures we receive a response even when the user didn't say anything
        })
    }

    // TODO - handle transfer

    return response.toString()
}
