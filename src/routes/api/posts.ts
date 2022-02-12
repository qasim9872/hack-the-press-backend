import { FastifyPluginAsync } from "fastify"
import { AutoloadPluginOptions } from "fastify-autoload"

import { getRouteFromFileName } from "@utils/helpers"
import { CreatePostBody, CreatePostRequest, GetPostWithId } from "@root/interfaces/posts.interface"

const postOpts = {
  schema: {
    tags: ["bot actions"],
    description: "Endpoint for updating/adding intent-answer pair for the bot with id",
    summary: "add intent/answer pair for bot with id",
    body: CreatePostBody,
  },
}

const routePlugin: FastifyPluginAsync<AutoloadPluginOptions> = async (app) => {
  const ROUTE = getRouteFromFileName(__filename)
  app.get(ROUTE, async () => {
    return [
      {
        name: "Sanjeev",
        lat: "51.5251747",
        long: "-0.0714288",
        title: "title of post",
        text: "Here at the Hack!",
        locationName: "Newspeak House",
        postingType: "General", // News | Event |  General
        tags: [], // Historical Landmark | Food | Music | Charity Drop off
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Test 1",
        lat: "51.5251747",
        long: "-0.0714288",
        title: "title of post",
        text: "Here at the Hack!",
        locationName: "Newspeak House",
        postingType: "General", // News | Event | General
        tags: [], // Historical Landmark | Food | Music | Charity Drop off
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Test 2",
        lat: "51.5251747",
        long: "-0.0714288",
        title: "title of post",
        text: "Here at the Hack!",
        locationName: "Newspeak House",
        postingType: "General", // News | Event | General
        tags: [], // Historical Landmark | Food | Music | Charity Drop off
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  })

  // app.post(ROUTE, postOpts, async function handler(request: CreatePostRequest, reply: FastifyReply) {
  //   const body = request.body
  //   request.log.info(body, `creating a new bot with the given values`)

  //   reply.status(201)
  //   return create(body)
  // })
}

export default routePlugin
