import { FastifyLoggerInstance } from "fastify"
import { LogFn } from "pino"

export interface MetaInfo {
  [key: string]: string

  callId: string
  from: string
  to: string
}

export default class PinoChildLogger {
  child: FastifyLoggerInstance

  info: LogFn
  debug: LogFn
  notifyOnSlack: LogFn
  warn: LogFn
  error: LogFn

  constructor(private readonly logger: FastifyLoggerInstance, private readonly meta: MetaInfo) {
    this.child = this.logger.child(meta)

    this.info = this.child.info.bind(this.child)
    this.debug = this.child.debug.bind(this.child)

    // TODO - the below functions will send messages to slack when called
    this.notifyOnSlack = this.child.notifyOnSlack.bind(this.child)
    this.warn = this.child.warn.bind(this.child)
    this.error = this.child.error.bind(this.child)
  }
}
