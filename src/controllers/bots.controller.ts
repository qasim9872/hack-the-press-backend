import { MyBot, MyBotModel } from "@root/models/my-bot.model"
import { CreateBotBody, GetBotsQueryFilter } from "@root/interfaces/bot.interface"
import Boom from "boom"

export function format(bot: MyBot) {
  // TODO - create format function
  return bot
}

export async function fetchAllBots(filter: GetBotsQueryFilter) {
  // map phoneNumber to phoneNumbers
  const query: { [key: string]: any } = {
    ...filter,
  }

  if (filter.phoneNumber) {
    // phoneNumber is mapped to phoneNumbers
    query.phoneNumbers = filter.phoneNumber
    delete query.phoneNumber
  }

  const bots = await MyBotModel.find(query)

  return bots.map(format)
}

export async function createBot(botRequest: CreateBotBody) {
  // validate phone number and name is unique
  const bots = await MyBotModel.find({
    $or: [{ name: botRequest.name }, ...botRequest.phoneNumbers.map((pn) => ({ phoneNumbers: pn }))],
  })

  if (bots.length > 0) {
    throw new Boom(`Bot with name/number already exists`, {
      statusCode: 400,
      message: `Bot with name/number already exists`,
    })
  }

  // intent answer pairs is empty by default
  const bot = await MyBotModel.create({ ...botRequest, intentAnswerPairs: [] })

  return format(bot)
}

export async function fetchBot(id: string) {
  const bot = await MyBotModel.findById(id).catch((err) => {
    if (err.kind === "ObjectId") {
      throw new Boom(`invalid id provided: ${id}`, {
        statusCode: 400,
        message: `invalid id provided: ${id}`,
      })
    }

    throw err
  })

  if (!bot) {
    throw new Boom(`Bot with id: ${id} doesn't exist`, {
      statusCode: 400,
      message: `Bot with id: ${id} doesn't exist`,
    })
  }

  return bot
}

// export async function updateBot() {}
// export async function deleteBot() {}
