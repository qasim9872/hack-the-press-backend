import { FastifyLoggerInstance, FastifyLogFn } from "fastify/types/logger"

export interface CustomFastifyLoggerInstance extends FastifyLoggerInstance {
  notifyOnSlack: FastifyLogFn
}
