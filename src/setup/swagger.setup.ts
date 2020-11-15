import { FastifyPluginCallback } from "fastify"
import fp from "fastify-plugin"
import { PluginOptions } from "fastify-plugin"
import swagger from "fastify-swagger"
import { join } from "path"

import { HOST } from "@config/app.config"

const packagePath = join(process.cwd(), "package.json")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name: title, description, version } = require(packagePath)

const swaggerPlugin: FastifyPluginCallback<PluginOptions> = (app, options, done) => {
  app.register(swagger, {
    routePrefix: "/docs",
    swagger: {
      info: {
        title,
        description,
        version,
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: HOST,
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    exposeRoute: true,
  })

  done()
}

export default fp(swaggerPlugin)
