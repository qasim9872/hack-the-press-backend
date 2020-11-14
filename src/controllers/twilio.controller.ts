import { ACCOUNT_SID, AUTH_TOKEN, TTS_ATTRIBUTES, STT_LANGUAGE } from "@config/twilio.config"
import { IntentAnswerPair } from "@root/models/intent-answer-pair"
import Boom from "boom"
import { FastifyLoggerInstance } from "fastify"
import twilio from "twilio"
import VoiceResponse from "twilio/lib/twiml/VoiceResponse"

const VoiceResponseConstruct = twilio.twiml.VoiceResponse
export const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

export function gather(voiceResponse: VoiceResponse) {
    return voiceResponse.gather({
        // hints
        input: ["dtmf", "speech"],
        language: STT_LANGUAGE,
        speechModel: "phone_call",
        enhanced: true,
        // timeout: 2, // the callback will be triggered after silence for this amount of time
        speechTimeout: "auto",
        actionOnEmptyResult: true, // this ensures we receive a response even when the user didn't say anything
    })
}

export function sayText(voiceResponse: VoiceResponse, text: string, attributes = TTS_ATTRIBUTES) {
    // add the text response
    return voiceResponse.say(attributes, text)
}

export function createResponse(logger: FastifyLoggerInstance, intentAnswerPair: IntentAnswerPair) {
    const voiceResponse = new VoiceResponseConstruct()

    const { response: message, config } = intentAnswerPair
    const hangup = config?.hangup || false
    const transfer = config?.transfer || false
    const transferPreferences = config?.transferPreferences
    let ending = false // only add gather if ending is false

    // add the text response as the first part
    sayText(voiceResponse, message.join(``))

    // TODO - handle transfer
    if (transfer) {
        const transferTarget = transferPreferences?.transferTarget

        if (!transferTarget) {
            throw new Boom(`No transfer target defined.`)
        }

        logger.info(`transferring call to: ${transferTarget}`)
        // TODO - look into doing warm transfers
        voiceResponse.dial(transferTarget)
        ending = true
    }

    if (hangup) {
        logger.info(`ending call`)
        voiceResponse.hangup()
        ending = true
    }

    if (!ending) {
        gather(voiceResponse)
    }

    return voiceResponse.toString()
}
