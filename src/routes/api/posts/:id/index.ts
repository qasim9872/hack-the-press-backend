import { FastifyPluginAsync } from "fastify"

import { AutoloadPluginOptions } from "fastify-autoload"
import { getRouteFromFileName } from "@utils/helpers"
import { PostWithIdRequest, GetPostWithId } from "@root/interfaces/posts.interface"
import { fetchPost } from "@root/controllers/posts.controller"

const ROUTE = getRouteFromFileName(__filename)

const getOpts = {
  schema: {
    tags: ["post wit id actions"],
    description: "Endpoint for looking up details of a post using id",
    summary: "find post with id",
    params: GetPostWithId,
  },
}

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  app.get(ROUTE, getOpts, async function handler(request: PostWithIdRequest) {
    const { id } = request.params
    request.log.info(`retrieving details for bot with id: ${id}`)

    return fetchPost(id)
  })
}

export default routePlugin
