import { FastifyPluginAsync, FastifyReply } from "fastify"

import { AutoloadPluginOptions } from "fastify-autoload"
import { getRouteFromFileName } from "@utils/helpers"
import { init, process } from "@controllers/conversation.controller"
import { BodySchema, TwilioRequest } from "@root/interfaces/twilio.interface"
import { createChildLogger } from "@utils/logger/helper"
import twilioWebhookPlugin from "@root/plugins/twilio.webhook.plugin"

const ROUTE = getRouteFromFileName(__filename)

const opts = {
  schema: {
    tags: ["twilio"],
    description: "Endpoint for processing user input that is sent by twilio",
    summary: "handles twilio voice callback request",
    body: BodySchema,
  },
}

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  await app.register(twilioWebhookPlugin)

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

    const logger = createChildLogger(request.log, { callId, from, to })

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
