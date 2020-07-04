import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"

export async function createApp() {
    const app = express()

    return app
}
