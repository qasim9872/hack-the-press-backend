import config from "config"

export const ACCOUNT_SID: string = config.get("TWILIO.ACCOUNT_SID")
export const AUTH_TOKEN: string = config.get("TWILIO.AUTH_TOKEN")
