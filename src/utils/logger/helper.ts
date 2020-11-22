import { FastifyLoggerInstance } from "fastify"
import { info, warn, error } from "../slack"

export interface MetaInfo {
  [key: string]: string

  callId: string
  from: string
  to: string
}

export type SlackLogFn = (message: string) => false | Promise<void>

export interface SlackLogger {
  info: SlackLogFn
  warn: SlackLogFn
  error: SlackLogFn
}

export function wrapWithPrefix(prefix: string, fn: SlackLogFn): SlackLogFn {
  return (msg: string) => fn(`${prefix} ${msg}`)
}

export function createSlackLogger(meta: MetaInfo): SlackLogger {
  const prefix = `[${meta.callId}: ${meta.from} => ${meta.to}] `

  return {
    info: wrapWithPrefix(prefix, info),
    warn: wrapWithPrefix(prefix, warn),
    error: wrapWithPrefix(prefix, error),
  }
}

export type CustomLogger = FastifyLoggerInstance & { slack: SlackLogger }

export function createChildLogger(logger: FastifyLoggerInstance, meta: MetaInfo): CustomLogger {
  const slack = createSlackLogger(meta)

  const child: any = logger.child(meta)
  child.slack = slack

  return child
}
