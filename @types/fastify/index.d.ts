import fastify from "fastify"
import { LogFn } from "pino"

declare module "fastify" {
  export interface FastifyLoggerInstance {
    notifyOnSlack: LogFn
  }
}
