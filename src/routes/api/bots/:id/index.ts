import { FastifyPluginAsync } from "fastify"

import { AutoloadPluginOptions } from "fastify-autoload"
import { getRouteFromFileName } from "@utils/helpers"
import { fetchBot } from "@controllers/bots.controller"
import { IS_PROD } from "@config/app.config"
import logger from "@utils/logger"
import { GetBotWithId, GetBotWithIdRequest } from "@root/interfaces/bot.interface"

const ROUTE = getRouteFromFileName(__filename)

const getOpts = {
  schema: {
    tags: ["bot actions"],
    description: "Endpoint for getting bots",
    summary: "internal endpoint for fetching bots",
    params: GetBotWithId,
  },
}

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  if (IS_PROD) {
    logger.warn(`Skipping internal endpoints`)
    return
  }

  app.get(ROUTE, getOpts, async function handler(request: GetBotWithIdRequest) {
    const { id } = request.params
    request.log.info(`retrieving details for bot with id: ${id}`)

    return fetchBot(id)
  })
}

export default routePlugin
