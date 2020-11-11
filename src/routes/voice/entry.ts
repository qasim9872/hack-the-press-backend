import { FastifyPluginAsync } from "fastify"
import { AutoloadPluginOptions } from "fastify-autoload"

import { getRouteFromFileName } from "@utils/helpers"

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
    const ROUTE = getRouteFromFileName(__filename)
    app.post(ROUTE, async () => {
        return { hello: "world" }
    })
}

export default routePlugin
