import { FastifyPluginAsync, FastifyReply } from "fastify"

import { getRouteFromFileName } from "@utils/helpers"
import { process } from "@controllers/conversation.controller"
import { BodySchema, TwilioRequest } from "@root/interfaces/twilio.interface"
import { AutoloadPluginOptions } from "fastify-autoload"

const ROUTE = getRouteFromFileName(__filename)

const opts = { schema: { body: BodySchema } }

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
    app.post(ROUTE, opts, async function handler(request: TwilioRequest, reply: FastifyReply) {
        reply.header("Content-Type", "text/xml")

        const from = request.body.From
        const to = request.body.To
        const callId = request.body.CallSid
        const direction = request.body.Direction
        const status = request.body.CallStatus

        request.log.debug(`${direction} call: ${status}`, {
            to,
            from,
            callId,
        })

        return process(from, to, callId)
    })
}

export default routePlugin
