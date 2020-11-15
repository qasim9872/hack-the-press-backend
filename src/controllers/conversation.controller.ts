import { classify } from "./nlp.controller"
import { MyBotModel } from "../models/my-bot.model"
import { createResponse } from "./twilio.controller"
import Boom from "boom"

import { CustomFastifyLoggerInstance } from "@root/types/fastify.types"

export async function getResponse(logger: CustomFastifyLoggerInstance, to: string, intent: string) {
  const bot = await MyBotModel.findByPhoneNumber(to)

  if (!bot) {
    const message = `No bot found for phone number: ${to}`
    throw new Boom(message, {
      statusCode: 400,
      message,
    })
  }

  logger.info(`found bot with id: ${bot.id} for phone number ${to}`)

  const intentAnswerPair = bot.findIntent(intent)

  if (!intentAnswerPair) {
    const message = `No match found for intent: ${intent}`
    throw new Boom(message, {
      statusCode: 400,
      message,
    })
  }

  // create response
  return createResponse(logger, intentAnswerPair)
}

export async function init(logger: CustomFastifyLoggerInstance, to: string) {
  const greetings = "General_Greetings"

  return getResponse(logger, to, greetings)
}

export async function process(logger: CustomFastifyLoggerInstance, to: string, input: string) {
  const { top } = await classify(logger, input)

  const { intent } = top

  logger.info(`top intent: ${intent}`)
  if (["NO_MATCH", "NO_INPUT"].includes(intent)) {
    logger.warn(`WARNING: intent classified as: ${intent}. ${input}`)
  }

  return getResponse(logger, to, intent)
}
