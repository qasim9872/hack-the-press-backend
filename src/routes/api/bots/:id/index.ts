import { FastifyPluginAsync } from "fastify"

import { AutoloadPluginOptions } from "fastify-autoload"
import { getRouteFromFileName } from "@utils/helpers"
import { deleteBot, fetchBot } from "@controllers/bots.controller"
import { IS_PROD } from "@config/app.config"
import logger from "@utils/logger"
import { GetBotWithId, BotWithIdRequest } from "@root/interfaces/bot.interface"

const ROUTE = getRouteFromFileName(__filename)

const getOpts = {
  schema: {
    tags: ["bot actions"],
    description: "Endpoint for looking up details of a bot using id",
    summary: "find bot with id",
    params: GetBotWithId,
  },
}

const deleteOpts = {
  schema: {
    tags: ["bot actions"],
    description: "Endpoint for deleting a bot using id",
    summary: "delete bot with id",
    params: GetBotWithId,
  },
}

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  if (IS_PROD) {
    logger.warn(`Skipping internal endpoints`)
    return
  }

  app.get(ROUTE, getOpts, async function handler(request: BotWithIdRequest) {
    const { id } = request.params
    request.log.info(`retrieving details for bot with id: ${id}`)

    return fetchBot(id)
  })

  app.delete(ROUTE, deleteOpts, async function handler(request: BotWithIdRequest) {
    const { id } = request.params
    request.log.info(`retrieving details for bot with id: ${id}`)

    return deleteBot(id)
  })
}

export default routePlugin
