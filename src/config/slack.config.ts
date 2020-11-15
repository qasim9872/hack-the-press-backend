import config from "config"

interface SlackChannels {
  INFO: string
  WARN: string
  ERROR: string
}

export const SLACK_URL: string = config.get("SLACK.URL")
export const SLACK_CHANNELS: SlackChannels = config.get("SLACK.CHANNELS")
export const SLACK_TOKEN: string = config.get("SLACK.TOKEN")
