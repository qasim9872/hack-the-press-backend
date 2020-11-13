import { classify } from "./nlp.controller"
import { MyBotModel } from "../models/my-bot.model"
import { sayText } from "./twilio.controller"
import { FastifyLoggerInstance } from "fastify"
import Boom from "boom"

export async function getResponse(logger: FastifyLoggerInstance, to: string, intent: string) {
    const bot = await MyBotModel.findByPhoneNumber(to)

    if (!bot) {
        const message = `No bot found for phone number: ${to}`
        throw new Boom(message, {
            statusCode: 400,
            message,
        })
    }

    logger.info(`found bot with id: ${bot.id} for phone number ${to}`)

    const faq = bot.faqMap.find((faq) => faq.intent.includes(intent))

    if (!faq) {
        const message = `No match found for intent: ${intent}`
        throw new Boom(message, {
            statusCode: 400,
            message,
        })
    }

    return sayText(faq.response.join(``))
}

export async function init(logger: FastifyLoggerInstance, to: string) {
    const greetings = "General_Greetings"

    return getResponse(logger, to, greetings)
}

export async function process(logger: FastifyLoggerInstance, to: string, input: string) {
    const { top } = await classify(logger, input)

    const { intent } = top

    logger.info(`top intent: ${intent}`)

    return getResponse(logger, to, intent)
}
