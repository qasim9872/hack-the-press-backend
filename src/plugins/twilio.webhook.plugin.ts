import { validateRequest } from "@root/controllers/twilio.controller"
import { TwilioRequest } from "@root/interfaces/twilio.interface"
import { extractRequestUri } from "@root/utils/helpers"
import Boom from "boom"
import { FastifyPluginCallback } from "fastify"
import fp from "fastify-plugin"
import { PluginOptions } from "fastify-plugin"

const twilioWebhookPlugin: FastifyPluginCallback<PluginOptions> = (app, options, done) => {
  app.addHook("preHandler", async (request: TwilioRequest) => {
    const signature = request.headers["x-twilio-signature"]
    const params = request.body

    const url = extractRequestUri(request)

    if (!validateRequest(signature, url, params)) {
      request.log.warn({ url }, `request did not originate from twilio`)
      throw new Boom(`Twilio webhook validation has failed`, {
        statusCode: 401,
        message: `please validate the request origin`,
      })
    }
  })

  done()
}

export default fp(twilioWebhookPlugin)
