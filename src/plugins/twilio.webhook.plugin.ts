import { FastifyPluginCallback, FastifyRequest } from "fastify"
import fp from "fastify-plugin"
import { PluginOptions } from "fastify-plugin"

const twilioWebhookPlugin: FastifyPluginCallback<PluginOptions> = (app, options, done) => {
  app.addHook("onRequest", async (request: FastifyRequest) => {
    request.log.info(`I am in onRequest`)
  })

  // Works with async functions too
  app.addHook("preHandler", async (request: FastifyRequest) => {
    request.log.info(`I am in preHandler`)
  })

  done()
}

export default fp(twilioWebhookPlugin)
