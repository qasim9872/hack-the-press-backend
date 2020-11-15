import config from "config"

// Transport config
export const CONSOLE_LOG: boolean = config.get("LOGGER.CONSOLE_LOG")
export const BATCH_SIZE: number = config.get("LOGGER.TRANSPORT.BATCH_SIZE")
export const TIMEOUT: number = config.get("LOGGER.TRANSPORT.TIMEOUT")
