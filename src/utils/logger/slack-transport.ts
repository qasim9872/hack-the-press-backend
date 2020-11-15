#!/usr/bin/env node
import pump from "pump"
import split from "split2"
import through, { TransformCallback } from "through2"

import { CONSOLE_LOG, BATCH_SIZE, TIMEOUT } from "@config/logger.config"
import { SLACK_CHANNELS } from "@config/slack.config"
import send from "../slack"

const LEVEL_MAP: { [key: string]: string } = {
  35: "INFO",
  40: "WARN",
  50: "ERROR",
}

export interface Log extends Record<string, any> {
  time: number
  level: number
  pid?: number
  hostname?: string
  name?: string
  msg: string

  // twilio specific bindings
  callId?: string
  from?: string
  to?: string
}

let timeoutId: NodeJS.Timeout
let batch: Log[] = []

export function safeParse(src: string) {
  try {
    const parsed = JSON.parse(src)

    if (CONSOLE_LOG) {
      console.log(src)
    }

    return parsed
  } catch (e) {
    if (CONSOLE_LOG) {
      console.log(src)
    }
  }
}

function sendAndClear() {
  batch.forEach((log) => {
    const level = LEVEL_MAP[log.level]
    const textArray = [`${level}: ${log.msg}`]

    if (log.callId) {
      textArray.push(`${log.callId}: ${log.from} -> ${log.to}`)
    }

    const channel = SLACK_CHANNELS[level]
    send(textArray.join("\n"), channel)
  })

  batch = []
}

export function handleLog(log: Log, callback?: TransformCallback) {
  // only add specific type of messages to batch

  // level 20 is debug
  // level 30 is info
  // level 35 is notifyOnSlack
  // level 40 is warn
  // level 50 is error
  if ([35, 40, 50].includes(log.level)) {
    clearTimeout(timeoutId)

    batch.push(log)

    // send all batched logs
    if (batch.length === BATCH_SIZE) {
      sendAndClear()

      callback?.()
    } else {
      // set a timer for sending logs
      timeoutId = setTimeout(sendAndClear, TIMEOUT)
    }
  }

  callback?.()
}

const transport = through.obj((log: Log, _enc: any, callback: any) => {
  handleLog(log, callback)
})

console.log(`SLACK TRANSPORT is running`)
pump(process.stdin, split(safeParse), transport)
