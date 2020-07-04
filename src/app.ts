import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import pinoExpress from "express-pino-logger"
import { Server } from "typescript-rest"

import logger from "./utils/logger"
import { IS_PROD } from "./config/app.config"

export async function createApp() {
    const app = express()

    // middlewares
    app.use(helmet())
    app.use(cors())
    app.use(
        morgan("combined", {
            stream: {
                write: (log) => logger.info(log),
            },
        })
    )
    app.use(
        pinoExpress({
            logger,
        })
    )

    // load routes
    Server.loadServices(app, "routes/*", __dirname)

    // Only publish docs if running in non-prod mode
    !IS_PROD && Server.swagger(app, { endpoint: "docs", filePath: "./dist/swagger.json" })

    return app
}
