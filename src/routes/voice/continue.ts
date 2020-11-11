import { FastifyPluginAsync, FastifyReply, FastifyRequest, FastifyPluginOptions } from "fastify"

import { getRouteFromFileName } from "@utils/helpers"
import { continueConversation } from "@controllers/conversation.controller"

async function handler(request: FastifyRequest, reply: FastifyReply) {
    reply.header("Content-Type", "text/xml")

    return continueConversation()
}

const routePlugin: FastifyPluginAsync<FastifyPluginOptions> = async (app) => {
    const ROUTE = getRouteFromFileName(__filename)
    app.post(ROUTE, handler)
}

export default routePlugin
