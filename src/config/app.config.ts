import config from "config"

export const NODE_ENV = config.util.getEnv("NODE_ENV")
export const IS_PROD = NODE_ENV === "production"

export const PORT = config.get<number>("APP.PORT")
export const LOG_LEVEL = config.get<string>("APP.LOG_LEVEL")
export const NAME = config.get<string>("APP.NAME")
