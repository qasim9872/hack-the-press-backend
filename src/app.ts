import fastify from "fastify"
import helmet from "fastify-helmet"
import blipp from "fastify-blipp"
import boom from "fastify-boom"
import health from "fastify-healthcheck"
import autoLoad from "fastify-autoload"
import middie from "middie"
import formbody from "fastify-formbody"

import { join } from "path"

import logger from "./utils/logger"
import { IS_PROD } from "@config/app.config"
import swagger from "./setup/swagger.setup"

export async function createApp() {
    const app = fastify({ logger })

    // Only publish docs if running in non-prod mode
    // Ensure swagger is registered before the routes are set up
    !IS_PROD && app.register(swagger)

    await app.register(middie)

    // plugins
    app.register(helmet)
    app.register(blipp)
    app.register(boom)
    app.register(health)
    app.register(formbody)
    app.register(autoLoad, {
        dir: join(__dirname, "routes"),
    })
    // app.use(cors())

    return app
}
