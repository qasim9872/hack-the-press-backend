import { FastifyPluginAsync, FastifyReply } from "fastify"

import { AutoloadPluginOptions } from "fastify-autoload"
import { getRouteFromFileName, unescapeValues } from "@utils/helpers"
import { CreateBotBody, CreateBotRequest, GetBotsQueryFilter, GetBotsRequest } from "@root/interfaces/bot.interface"
import { createBot, fetchAllBots } from "@controllers/bots.controller"
import { IS_PROD } from "@config/app.config"
import logger from "@utils/logger"

const ROUTE = getRouteFromFileName(__filename)

const getOpts = {
  schema: {
    tags: ["manage bots"],
    description: "Endpoint for getting bots",
    summary: "internal endpoint for fetching bots",
    querystring: GetBotsQueryFilter,
  },
}

const postOpts = {
  schema: {
    tags: ["manage bots"],
    description: "Endpoint for creating a new bot",
    summary: "internal endpoint for creating a bot",
    body: CreateBotBody,
  },
}

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  if (IS_PROD) {
    logger.warn(`Skipping internal endpoints`)
    return
  }

  console.log(`I am being loaded -> ${ROUTE}`)
  app.get(ROUTE, getOpts, async function handler(request: GetBotsRequest) {
    const query = unescapeValues(request.query)
    request.log.info(query, `searching for bots with given filter`)

    return fetchAllBots(query)
  })

  app.post(ROUTE, postOpts, async function handler(request: CreateBotRequest, reply: FastifyReply) {
    const body = request.body
    request.log.info(body, `creating a new bot with the given values`)

    reply.status(201)
    return createBot(body)
  })
}

export default routePlugin
