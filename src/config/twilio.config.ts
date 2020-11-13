import config from "config"
import { GatherLanguage, SayAttributes, SayLanguage, SayVoice } from "twilio/lib/twiml/VoiceResponse"

export const ACCOUNT_SID: string = config.get("TWILIO.ACCOUNT_SID")
export const AUTH_TOKEN: string = config.get("TWILIO.AUTH_TOKEN")

export const TTS_VOICE: SayVoice = config.get("TWILIO.TTS.VOICE")
export const TTS_LANGUAGE: SayLanguage = config.get("TWILIO.TTS.LANGUAGE")
export const STT_LANGUAGE: GatherLanguage = config.get("TWILIO.STT.LANGUAGE")

export const TTS_ATTRIBUTES: SayAttributes = {
    voice: TTS_VOICE,
    language: TTS_LANGUAGE,
}
