import { FastifyInstance } from "fastify"
import { AutoloadPluginOptions } from "fastify-autoload"

import { getRouteFromFileName } from "@utils/helpers"

export default async function (app: FastifyInstance, opts: AutoloadPluginOptions) {
    const ROUTE = getRouteFromFileName(__filename, opts.dir)
    app.get(ROUTE, async () => {
        // Complex code here
        return { hello: true }
    })
}
