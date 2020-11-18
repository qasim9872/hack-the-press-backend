import { SLACK_URL, SLACK_TOKEN, SLACK_CHANNELS } from "@config/slack.config"
import { IS_PROD } from "@root/config/app.config"
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

export const notifyIfProd = (message: string, channelId = SLACK_CHANNELS.INFO) =>
  IS_PROD && notifyOnSlack(message, channelId)
export const notifyInfo = (message: string) => notifyIfProd(message, SLACK_CHANNELS.INFO)
export const notifyWarning = (message: string) => notifyIfProd(message, SLACK_CHANNELS.WARN)
export const notifyError = (message: string) => notifyIfProd(message, SLACK_CHANNELS.ERROR)
