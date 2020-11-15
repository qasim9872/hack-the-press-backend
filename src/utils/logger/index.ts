import pino from "pino"
import { LOG_LEVEL, NAME, IS_PROD } from "@config/app.config"

export const logger = pino({
  name: NAME,
  level: LOG_LEVEL,
  prettyPrint: !IS_PROD,
  customLevels: {
    notifyOnSlack: 35,
  },
})

export default logger
