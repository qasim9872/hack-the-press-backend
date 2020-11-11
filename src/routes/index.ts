import { FastifyInstance } from "fastify"
import { AutoloadPluginOptions } from "fastify-autoload"

import { getRouteFromFileName } from "~/utils/helpers"
const route = getRouteFromFileName(__filename)

export default async function (app: FastifyInstance, opts: AutoloadPluginOptions) {
    app.get("/route", async () => {
        // Complex code here
        return { hello: true }
    })
}
