import { DB_URI } from "@config/database.config"
import { connectMongo, disconnectMongo } from "@root/setup/mongoose.setup"
import { MyBotModel } from "@root/models/my-bot.model"
import logger from "@utils/logger"

const name = "my-voice-bot"
const details = "my first voice bot"
const phoneNumber = "+447401158336"
const transferTarget = "+447459130336"

enum INTENTS {
  GENERAL_GREETINGS = "General_Greetings",
  GENERAL_ENDING = "General_Ending",
  GENERAL_ABOUT_YOU = "General_About_You",
  GENERAL_AGENT_CAPABILITIES = "General_Agent_Capabilities",
  GENERAL_CONNECT_TO_AGENT = "General_Connect_to_Agent",
  GENERAL_HUMAN_OR_BOT = "General_Human_or_Bot",
  GENERAL_JOKES = "General_Jokes",
  GENERAL_NEGATIVE_FEEDBACK = "General_Negative_Feedback",
  GENERAL_POSITIVE_FEEDBACK = "General_Positive_Feedback",
  GENERAL_SECURITY_ASSURANCE = "General_Security_Assurance",
  NO_MATCH = "NO_MATCH",
  NO_INPUT = "NO_INPUT",
}

const map = {
  [INTENTS.NO_INPUT]: "I didn't hear you say anything, can you try saying it again?",
  [INTENTS.NO_MATCH]: "I am sorry I couldn't find a response for your query, please try asking in a different way?",
  [INTENTS.GENERAL_GREETINGS]: "hello, how can I help you today?",
  [INTENTS.GENERAL_ENDING]: "Have a good day",
  [INTENTS.GENERAL_ABOUT_YOU]: "I'm a bot",
  [INTENTS.GENERAL_AGENT_CAPABILITIES]: "anything you ask",
  [INTENTS.GENERAL_CONNECT_TO_AGENT]: "Mein hon toh kya gham hai",
  [INTENTS.GENERAL_HUMAN_OR_BOT]: "however you like",
  [INTENTS.GENERAL_JOKES]: "two minutes",
  [INTENTS.GENERAL_NEGATIVE_FEEDBACK]: "keep going",
  [INTENTS.GENERAL_POSITIVE_FEEDBACK]: "I'm lovin it",
  [INTENTS.GENERAL_SECURITY_ASSURANCE]: "try me",
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

  if (!bot) {
    logger.info(`creating bot. Bot with phone number: ${phoneNumber} doesn't exist`)
    bot = await MyBotModel.create({ name, details, phoneNumbers: [phoneNumber], intentAnswerPairs: [] })
  }

  logger.info(`bot with phone number: ${phoneNumber} has id: ${bot.id}`)

  for (const [intent, response] of Object.entries(map)) {
    logger.debug(`Adding intent: ${intent} => ${response}`)
    await bot?.addResponse(intent, [response], special[intent], true, true)
  }

  disconnectMongo()
})()
