import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import { AutoloadPluginOptions } from "fastify-autoload"

import { getRouteFromFileName } from "@utils/helpers"
import { sayText } from "@controllers/twilio.controller"

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
    const ROUTE = getRouteFromFileName(__filename)
    app.post(ROUTE, async (request: FastifyRequest, reply: FastifyReply) => {
        reply.header("Content-Type", "text/xml")

        return sayText(`Hello world. You're calling a twiml application`)
    })
}

export default routePlugin
