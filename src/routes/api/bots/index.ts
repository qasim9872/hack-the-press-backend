import { FastifyPluginAsync } from "fastify"

import { AutoloadPluginOptions } from "fastify-autoload"
import { getRouteFromFileName, unescapeValues } from "@utils/helpers"
import { GetBotsQueryFilter, GetBotsRequest } from "@root/interfaces/bot.interface"
import { fetchAllBots } from "@root/controllers/bots.controller"

const ROUTE = getRouteFromFileName(__filename)

const opts = {
  schema: {
    tags: ["manage"],
    description: "Endpoint for managing all available bots",
    summary: "internal endpoint",
    querystring: GetBotsQueryFilter,
  },
}

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  app.get(ROUTE, opts, async function handler(request: GetBotsRequest) {
    const query = unescapeValues(request.query)
    request.log.info(query, `searching for bots with given filter`)

    return fetchAllBots(query)
  })
}

export default routePlugin
