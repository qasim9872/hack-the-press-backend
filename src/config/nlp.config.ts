import config from "config"

export const API_KEY: string = config.get("NLP.WATSON.API_KEY")
export const URL: string = config.get("NLP.WATSON.URL")
export const ASSISTANT_ID: string = config.get("NLP.WATSON.ASSISTANT_ID")
export const CONFIDENCE_THRESHOLD: number = config.get("NLP.CONFIDENCE_THRESHOLD")
