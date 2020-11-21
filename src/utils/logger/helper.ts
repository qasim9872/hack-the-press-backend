import { FastifyLoggerInstance } from "fastify"
import { info, warn, error } from "../slack"

export interface MetaInfo {
  [key: string]: string

  callId: string
  from: string
  to: string
}

export interface SlackLogger {
  info: (message: string) => false | Promise<void>
  warn: (message: string) => false | Promise<void>
  error: (message: string) => false | Promise<void>
}

export function createSlackLogger(meta: MetaInfo): SlackLogger {
  // TODO - make slack logs contextual
  return {
    info,
    warn,
    error,
  }
}

export type CustomLogger = FastifyLoggerInstance & { slack: SlackLogger }

export function createChildLogger(logger: FastifyLoggerInstance, meta: MetaInfo): CustomLogger {
  const child = logger.child(meta)
  const slack = createSlackLogger(meta)

  return {
    ...child, // spread the log functions into the object
    slack,
  }
}
