import { DB_URI } from "./config/database.config"
import { connectMongo, disconnectMongo } from "./setup/mongoose.setup"
import { NODE_ENV, PORT, IS_PROD } from "./config/app.config"
import logger from "./utils/logger/index"
import { createApp } from "./app"
;(async function initiateApp() {
    await connectMongo(DB_URI)

    const app = await createApp()

    await app.listen(PORT)

    app.blipp()
    !IS_PROD && app.swagger()

    logger.info(`API is running in ${NODE_ENV} mode and is available at ${PORT}`)
})()

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
    logger.warn(`SIGINT received - closing app`)
    disconnectMongo()
    process.exit(0)
})
