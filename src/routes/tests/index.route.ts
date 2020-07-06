import fastify from "fastify"
import { TestModel, TestSchema, TestResponseSchema } from "../../models/test.model"

export const GET: fastify.DynamicRouteHandler = async (request) => {
    const tests = await TestModel.find()
    request.log.debug(`Fetching all tests`)

    return tests
}

GET.opts = {
    schema: {
        description: "Get all tests",
        tags: ["tests"],
        summary: "Get all tests request",
        response: {
            200: { type: "array", items: TestResponseSchema },
        },
    },
}

export const POST: fastify.DynamicRouteHandler = async (request) => {
    const userData = request.body
    return (await TestModel.create(userData)).toObject()
}

POST.opts = {
    schema: {
        description: "Create a new user",
        tags: ["tests"],
        summary: "Create a new user",
        body: TestSchema,
    },
}
