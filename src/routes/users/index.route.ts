import fastify from "fastify"
import { UserModel } from "../../models/user.model"

export const GET: fastify.DynamicRouteHandler = async (request, reply) => {
    request.log.debug(`Fetching all users`)
    return UserModel.find()
}

GET.opts = {
    schema: {
        description: "Description of this get route.",
        tags: ["api"],
        response: {
            200: {
                description: "Successful response",
                type: "object",
                properties: {
                    email: { type: "string", description: "Sample field referring to an email field" },
                    item: {
                        type: "string",
                        enum: ["enum1", "enum2", "enum3", "enum4", "enum5"],
                        description: "This item field will only accept defined entries in the enum definition.",
                    },
                },
            },
        },
        summary: "Get request",
        security: [
            {
                apiKey: [],
            },
        ],
    },
}
