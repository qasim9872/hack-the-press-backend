import { API_KEY, URL, ASSISTANT_ID, CONFIDENCE_THRESHOLD } from "@root/config/nlp.config"
import AssistantV2 from "ibm-watson/assistant/v2"
import { IamAuthenticator } from "ibm-watson/auth"
import logger from "@utils/logger"
import assert from "assert"

const assistant = new AssistantV2({
    version: "2020-08-01",
    authenticator: new IamAuthenticator({
        apikey: API_KEY,
    }),
    serviceUrl: URL,
})

export async function classify(text: string, assistantId = ASSISTANT_ID) {
    const params = {
        assistantId,
        input: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            message_type: "text",
            text,
        },
    }

    const response = await assistant.messageStateless(params).catch((err) => {
        logger.error(err)
        throw err
    })

    assert(
        response && response.status === 200,
        `Watson assistant returned non 200 response. text classification has failed: ${response.statusText}`
    )

    const output = response?.result?.output
    const intents = output?.intents || []
    const entities = output?.entities

    const classified = intents && intents.length > 0
    const top =
        classified && // only lookup the first intent if intent has been classified
        intents
            .sort(({ confidence: a }, { confidence: b }) => {
                if (a > b) return 1
                if (b > a) return -1

                return 0
            })
            .slice(0, 1) // slice to make a copy
            .shift() // to remove the first elem
    const valid = top && top.confidence > CONFIDENCE_THRESHOLD

    const result = {
        top,
        text,
        valid,
        intents,
        entities,
        classified,
    }

    logger.info(result, `input text successfully classified`)

    return result
}
