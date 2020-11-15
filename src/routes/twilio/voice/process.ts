import { FastifyPluginAsync, FastifyReply } from "fastify"

import { getRouteFromFileName } from "@utils/helpers"
import { init, process } from "@controllers/conversation.controller"
import { BodySchema, TwilioRequest } from "@root/interfaces/twilio.interface"
import { AutoloadPluginOptions } from "fastify-autoload"
import { CustomFastifyLoggerInstance } from "@root/types/fastify.types"

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

    const isOngoing = status === "in-progress"

    // user input if provided
    const digits = request.body.Digits
    const speech = request.body.SpeechResult

    const input = speech || digits || ""

    const logger: CustomFastifyLoggerInstance = request.log.child({ callId, from, to }) as any

    logger.debug(`${direction} call: ${status}`)

    if (!isOngoing) {
      logger.info(`starting new chat`)
      return init(logger, to)
    } else {
      logger.info(`continuing chat: ${input}`)
      return process(logger, to, input)
    }
  })
}

export default routePlugin
