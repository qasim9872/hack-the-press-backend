import fastify from "fastify"

export const GET: fastify.DynamicRouteHandler = async (req, rep) => {
    return { hello: "world" }
}
