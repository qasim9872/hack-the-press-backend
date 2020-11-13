import { FastifyPluginAsync, FastifyReply } from "fastify"

import { getRouteFromFileName } from "@utils/helpers"
import { init, process } from "@controllers/conversation.controller"
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

        // user input if provided
        const digits = request.body.Digits
        const speech = request.body.SpeechResult

        const input = speech || digits || "entry"

        request.log.debug(
            {
                to,
                from,
                callId,
                input,
            },
            `${direction} call: ${status}`
        )

        if (input) {
            request.log.info(`starting new chat`)
            return init(request.log, to)
        } else {
            request.log.info(`continuing chat: ${input}`)
            return process(request.log, to, input)
        }
    })
}

export default routePlugin
