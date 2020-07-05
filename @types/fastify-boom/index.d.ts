declare module "fastify-boom" {
    import * as fastify from "fastify"
    import * as http from "http"

    export interface fastifyBoomOptions {}

    const fastifyBoom: fastify.Plugin<http.Server, http.IncomingMessage, http.ServerResponse, fastifyBoomOptions>
    export default fastifyBoom
}
