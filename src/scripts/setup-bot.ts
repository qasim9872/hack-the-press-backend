import { MyBotModel } from "@root/models/my-bot.model"

const name = "my-voice-bot"
const details = "my first voice bot"
const phoneNumber = "+447453528748"

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
}

;(async function run() {
    let bot = await MyBotModel.findByPhoneNumber(phoneNumber)

    if (!bot) {
        bot = await MyBotModel.create({ name, details, phoneNumbers: [phoneNumber], faqMap: [] })
    }

    // await bot?.addResponse(INTENTS.GENERAL_GREETINGS, ["Welcome, how are you doing today?"])
})()
