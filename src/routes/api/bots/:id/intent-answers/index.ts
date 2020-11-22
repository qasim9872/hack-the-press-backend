import { FastifyPluginAsync } from "fastify"

import { AutoloadPluginOptions } from "fastify-autoload"
import { getRouteFromFileName } from "@utils/helpers"
import { fetchBot } from "@controllers/bots.controller"
import { IS_PROD } from "@config/app.config"
import logger from "@utils/logger"
import {
  BotIntentQuery,
  GetBotIntentRequest,
  GetBotWithId,
  PostBotIntentRequest,
  PostIntentBody,
} from "@root/interfaces/bot.interface"

const ROUTE = getRouteFromFileName(__filename)

const getOpts = {
  schema: {
    tags: ["bot actions"],
    description: "Endpoint for fetching intent-answer pairs for the bot with id",
    summary: "find intents for bot with id",
    params: GetBotWithId,
    query: BotIntentQuery,
  },
}

const postOpts = {
  schema: {
    tags: ["bot actions"],
    description: "Endpoint for updating/adding intent-answer pair for the bot with id",
    summary: "add intent/answer pair for bot with id",
    params: GetBotWithId,
    body: PostIntentBody,
  },
}

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  if (IS_PROD) {
    logger.warn(`Skipping internal endpoints`)
    return
  }

  app.get(ROUTE, getOpts, async function handler(request: GetBotIntentRequest) {
    const { id } = request.params
    const { intent } = request.query
    request.log.info(`retrieving details for bot with id: ${id}`)

    const bot = await fetchBot(id)

    return intent ? [bot.findIntent(intent)] : bot.intentAnswerPairs
  })

  app.post(ROUTE, postOpts, async function handler(request: PostBotIntentRequest) {
    const { id } = request.params
    const { intent, response, config } = request.body
    request.log.info(`retrieving details for bot with id: ${id}`)

    const bot = await fetchBot(id)

    await bot.addResponse(intent, response, config, true, true)

    return bot
  })
}

export default routePlugin
