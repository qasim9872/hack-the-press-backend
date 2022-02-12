import { FastifyPluginAsync } from "fastify"
import { AutoloadPluginOptions } from "fastify-autoload"

import { getRouteFromFileName } from "@utils/helpers"

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  const ROUTE = getRouteFromFileName(__filename)
  app.get(ROUTE, async () => {
    return [
      {
        name: "Sanjeev",
        lat: "51.5251747",
        long: "-0.0714288",
        text: "Here at the Hack!",
      },
      {
        name: "Test",
        lat: "51.5251747",
        long: "-0.0714288",
        text: "Im also here",
      },
      {
        name: "Rick",
        lat: "51.5251747",
        long: "-0.0714288",
        text: "wrecked son!",
      },
    ]
  })
}

export default routePlugin
