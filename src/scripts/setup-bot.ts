import { DB_URI } from "@config/database.config"
import { connectMongo, disconnectMongo } from "@root/plugins/mongoose.plugin"
import { MyBotModel } from "@root/models/my-bot.model"
import logger from "@utils/logger"
import { loadIntents } from "./load-intent-response"

const name = "my-voice-bot"
const details = "my first voice bot"
const phoneNumber = "+447453528748"
const transferTarget = "+447479481652"

enum INTENTS {
  GENERAL_ENDING = "General_Ending",
  GENERAL_CONNECT_TO_AGENT = "General_Connect_to_Agent",
}

const special: { [key: string]: any } = {
  [INTENTS.GENERAL_CONNECT_TO_AGENT]: {
    transfer: true,
    transferPreferences: {
      transferTarget,
    },
  },
  [INTENTS.GENERAL_ENDING]: {
    hangup: true,
  },
}

;(async function run() {
  await connectMongo(DB_URI)

  let bot = await MyBotModel.findByPhoneNumber(phoneNumber)
  const intentResponseMap = await loadIntents()

  if (!bot) {
    logger.info(`creating bot. Bot with phone number: ${phoneNumber} doesn't exist`)
    bot = await MyBotModel.create({ name, details, phoneNumbers: [phoneNumber], intentAnswerPairs: [] })
  }

  logger.info(`bot with phone number: ${phoneNumber} has id: ${bot.id}`)

  for (const [intent, response] of intentResponseMap.entries()) {
    logger.debug(`Adding intent: ${intent} => ${response}`)
    await bot?.addResponse(intent, response, special[intent], true, true)
  }

  disconnectMongo()
})()
