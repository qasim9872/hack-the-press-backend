import { FastifyInstance } from "fastify"
import fp from "fastify-plugin"
import { PluginOptions } from "fastify-plugin"
import swagger from "fastify-swagger"
import { IncomingMessage, Server, ServerResponse } from "http"
import { join } from "path"

import { HOST } from "@config/app.config"

const packagePath = join(process.cwd(), "package.json")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name: title, description, version } = require(packagePath)

export default fp(
    (
        app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
        opts: PluginOptions,
        done: (err?: Error) => void
    ) => {
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
)
