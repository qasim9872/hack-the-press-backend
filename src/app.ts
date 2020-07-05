import fastify from "fastify"
import helmet from "fastify-helmet"
import blipp from "fastify-blipp"
import boom from "fastify-boom"
import health from "fastify-healthcheck"
import { resolve } from "path"

import routeLoader from "./utils/fastify/route-loader"
import logger from "./utils/logger"
import { IS_PROD } from "./config/app.config"
import swagger from "./setup/swagger.setup"
import { FastifyApp } from "./types"

export async function createApp() {
    const app: FastifyApp = fastify({ logger })

    // plugins
    app.register(helmet)
    app.register(blipp)
    app.register(boom)
    app.register(health)
    // app.use(cors())

    // setup routes
    app.register(routeLoader, {
        directory: resolve(__dirname, `routes`),
        // match: /\.(route)\./,
    })

    // Only publish docs if running in non-prod mode
    !IS_PROD && app.register(swagger)

    return app
}
