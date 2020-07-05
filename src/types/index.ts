import fastify from "fastify"
import { IncomingMessage, ServerResponse, Server } from "http"

export type FastifyApp = fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>
