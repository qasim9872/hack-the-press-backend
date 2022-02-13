import { FastifyPluginAsync } from "fastify"

import { AutoloadPluginOptions } from "fastify-autoload"
import { getRouteFromFileName, unescapeValues } from "@utils/helpers"
import { GetLocationQuery, GetLocationRequest } from "@root/interfaces/location-lookup.interface"
import { places } from "../../../controllers/location.controller"

const ROUTE = getRouteFromFileName(__filename)

const getOpts = {
  schema: {
    tags: ["geo-location"],
    description: "Endpoint for getting nearby places",
    summary: "nearby places",
    querystring: GetLocationQuery,
  },
}

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  app.get(ROUTE, getOpts, async function handler(request: GetLocationRequest) {
    request.log.info(request.query, `looking up places nearby`)
    const query = unescapeValues(request.query)

    const results = await places(Number(query.lat), Number(query.long))

    return results
  })
}

export default routePlugin
