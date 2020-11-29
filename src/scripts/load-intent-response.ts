import { readFileSync } from "fs"
import { join } from "path"
import assert from "assert"

type INTENT_NAME = string
type RESPONSE = string[]

const PATH_TO_WATSON_INTENTS = join(__dirname, "intent-response.csv")

export async function loadIntents() {
  const intentMap = new Map<INTENT_NAME, RESPONSE>()
  const data = readFileSync(PATH_TO_WATSON_INTENTS, "utf-8")

  const lines = data.split("\n")

  for (const line of lines) {
    // skip empty lines
    if (!line) {
      continue
    }

    const responseAndIntent = line.split(",")

    const intent = responseAndIntent.shift()
    let response = responseAndIntent.join(",")

    response = response.startsWith('"') ? response.slice(1) : response
    response = response.endsWith('"') ? response.slice(0, -1) : response

    if (!response) {
      continue
    }

    assert(intent, `intent not parsed: ${line}`)
    assert(response, `response not parsed: ${line}`)

    const array: RESPONSE = intentMap.get(intent) || []
    array.push(response)

    intentMap.set(intent, array)
  }

  return intentMap
}
