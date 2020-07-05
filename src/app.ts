import fastify from "fastify"
import helmet from "fastify-helmet"
import blipp from "fastify-blipp"
import boom from "fastify-boom"
import health from "fastify-healthcheck"
import { IncomingMessage, ServerResponse, Server } from "http"

import logger from "./utils/logger"
import { IS_PROD } from "./config/app.config"
// import { setupControllers } from "./controllers"
import swagger from "./setup/swagger.setup"

type FastifyApp = fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>

export async function createApp() {
    const app: FastifyApp = fastify({ logger })

    // plugins
    app.register(helmet)
    app.register(blipp)
    app.register(boom)
    app.register(health)
    // app.use(cors())
    // app.use(
    //     morgan("combined", {
    //         stream: {
    //             write: (log) => logger.info(log),
    //         },
    //         skip: (req) => ["healthcheck", "docs"].some((path) => req.originalUrl.includes(path)),
    //     })
    // )
    // app.use(
    //     pinoExpress({
    //         logger,
    //     })
    // )

    // setup controllers
    // setupControllers(app)

    // Only publish docs if running in non-prod mode
    !IS_PROD && app.register(swagger)

    return app
}
