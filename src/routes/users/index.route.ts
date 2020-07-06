import fastify from "fastify"
import { UserModel } from "../../models/user.model"
import { UserSchema } from "../../schemas"

export const GET: fastify.DynamicRouteHandler = async (request) => {
    const users = await UserModel.find()
    request.log.debug(`Fetching all users`)

    return users
}

GET.opts = {
    schema: {
        description: "Get all users",
        tags: ["users"],
        summary: "Get all users request",
        response: {
            200: { type: "array", items: UserSchema },
        },
    },
}

export const POST: fastify.DynamicRouteHandler = async (request) => {
    const userData = request.body
    return (await UserModel.create(userData)).toObject()
}

POST.opts = {
    schema: {
        description: "Create a new user",
        tags: ["users"],
        summary: "Create a new user",
        body: UserSchema,
    },
}
