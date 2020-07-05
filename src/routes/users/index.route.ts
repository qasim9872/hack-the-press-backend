import fastify from "fastify"
import { UserModel } from "../../models/user.model"

export const GET: fastify.DynamicRouteHandler = async (request, reply) => {
    const users = await UserModel.find()
    request.log.debug(`Fetching all users`)

    return users
}

GET.opts = {
    schema: {
        description: "Description of this get route.",
        tags: ["api"],
        summary: "Get request",
    },
}
