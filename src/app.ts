import fastify from "fastify"
import helmet from "fastify-helmet"
import blipp from "fastify-blipp"
import boom from "fastify-boom"
import health from "fastify-healthcheck"
import autoLoad from "fastify-autoload"

import { join } from "path"

import logger from "./utils/logger"
import { IS_PROD } from "@config/app.config"
import swagger from "./setup/swagger.setup"
import { FastifyApp } from "./types"

export async function createApp() {
    const app: FastifyApp = fastify({ logger })

    // Only publish docs if running in non-prod mode
    // Ensure swagger is registered before the routes are set up
    !IS_PROD && app.register(swagger)

    const ROUTES = join(__dirname, "routes")

    // plugins
    app.register(helmet)
    app.register(blipp)
    app.register(boom)
    app.register(health)
    app.register(autoLoad, {
        dir: ROUTES,
        options: {
            dir: ROUTES,
        },
    })
    // app.use(cors())

    return app
}
