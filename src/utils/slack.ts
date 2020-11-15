import { SLACK_URL, SLACK_TOKEN, SLACK_CHANNELS } from "@config/slack.config"
import axios, { AxiosRequestConfig } from "axios"

export default async function notifyOnSlack(message: string, channelId: string = SLACK_CHANNELS.INFO, callback?: any) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: SLACK_URL,
    headers: {
      "content-type": "application/json; charset=utf-8",
      Authorization: `Bearer ${SLACK_TOKEN}`,
    },
    data: {
      text: message,
      channel: channelId,
    },
  }

  await axios(config).catch((err) => {
    console.log(`error occurred sending message to slack`, err)
  })

  // Allows usage with winston transport
  if (callback) {
    // eslint-disable-next-line callback-return
    callback()
  }
}
