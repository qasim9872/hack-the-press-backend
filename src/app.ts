import fastify from "fastify"
import helmet from "fastify-helmet"
import blipp from "fastify-blipp"
import boom from "fastify-boom"
import health from "fastify-healthcheck"
import autoLoad from "fastify-autoload"
import middie from "middie"
import formbody from "fastify-formbody"
import cors from "fastify-cors"

import { join } from "path"

import logger from "./utils/logger"
import swagger from "./plugins/swagger.plugin"

export async function createApp() {
  const app = fastify({ logger })

  // disable logs for health check endpoint
  app.addHook("onRoute", (opts: any) => {
    if (opts.path === "/health") {
      opts.logLevel = "silent"
    }
  })

  // Only publish docs if running in non-prod mode
  // Ensure swagger is registered before the routes are set up
  app.register(swagger)

  await app.register(middie)

  // plugins
  app.register(cors)
  app.register(helmet)
  app.register(blipp)
  app.register(boom)
  app.register(health, {
    exposeUptime: true,
  })
  app.register(formbody)
  app.register(autoLoad, {
    dir: join(__dirname, "routes"),
  })

  return app
}
