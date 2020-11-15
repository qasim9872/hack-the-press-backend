import { classify } from "./nlp.controller"
import { MyBotModel } from "../models/my-bot.model"
import { createResponse } from "./twilio.controller"
import Boom from "boom"

import { CustomFastifyLoggerInstance } from "@root/types/fastify.types"

export async function getResponse(logger: CustomFastifyLoggerInstance, to: string, intent: string, input?: string) {
  const bot = await MyBotModel.findByPhoneNumber(to)

  if (!bot) {
    const message = `No bot found for phone number: ${to}`
    logger.error(message)
    throw new Boom(message, {
      statusCode: 400,
      message,
    })
  }

  logger.info(`found bot with id: ${bot.id} for phone number ${to}`)

  let intentAnswerPair = bot.findIntent(intent)

  if (!intentAnswerPair) {
    const message = `Intent Answer Pair is not configured for intent: ${intent}. will switch to response for no match`
    logger.warn(message)

    intentAnswerPair = bot.findIntent("NO_MATCH")

    if (!intentAnswerPair) {
      throw new Boom(message, {
        statusCode: 400,
        message: `NO_MATCH intent not configured`,
      })
    }
  }

  if (["NO_MATCH", "NO_INPUT"].includes(intent)) {
    logger.warn(`WARNING: intent classified as: ${intent}. ${input}`)
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

  return getResponse(logger, to, intent, input)
}
