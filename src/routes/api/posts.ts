import { FastifyPluginAsync, FastifyReply } from "fastify"
import { AutoloadPluginOptions } from "fastify-autoload"

import { getRouteFromFileName } from "@utils/helpers"
import {
  CreatePostBody,
  CreatePostRequest,
  GetPostsQueryFilter,
  GetPostsRequest,
} from "@root/interfaces/posts.interface"
import { createCreatePostBody, search } from "@root/controllers/posts.controller"
import { unescapeValues } from "../../utils/helpers"

const postOpts = {
  schema: {
    tags: ["post actions"],
    description: "Endpoint for updating/adding post",
    summary: "add new post",
    body: CreatePostBody,
  },
}

const getOpts = {
  schema: {
    tags: ["post actions"],
    description: "Endpoint for updating/adding post",
    summary: "get new post",
    querystring: GetPostsQueryFilter,
  },
}

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  const ROUTE = getRouteFromFileName(__filename)
  app.get(ROUTE, getOpts, async (request: GetPostsRequest) => {
    const query = unescapeValues(request.query)
    request.log.info(query, `searching for bots with given filter`)

    return search(query)
  })

  app.post(ROUTE, postOpts, async function handler(request: CreatePostRequest, reply: FastifyReply) {
    const body = request.body
    request.log.info(body, `creating a new post with the given values`)

    reply.status(201)
    return createCreatePostBody(body)
  })
}

export default routePlugin
