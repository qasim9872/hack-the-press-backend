import { FastifyPluginAsync } from "fastify"
import { AutoloadPluginOptions } from "fastify-autoload"

import { getRouteFromFileName } from "@utils/helpers"

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app, opts) => {
    const ROUTE = getRouteFromFileName(__filename, opts.dir)
    app.get(ROUTE, async () => {
        return { hello: "world" }
    })
}

export default routePlugin
