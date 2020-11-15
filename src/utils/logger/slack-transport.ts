#!/usr/bin/env node
import pump from "pump"
import split from "split2"
import through, { TransformCallback } from "through2"

import { CONSOLE_LOG, BATCH_SIZE, TIMEOUT } from "@config/logger.config"
import send from "../slack"

export interface Log extends Record<string, any> {
  time: number
  v: number
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
  // send([...batch])

  batch = []
}

export function handleLog(log: Log, callback?: TransformCallback) {
  clearTimeout(timeoutId)

  // only add specific type of messages to batch
  batch.push(log)

  // send all batched logs
  if (batch.length === BATCH_SIZE) {
    sendAndClear()

    callback?.()
  } else {
    // set a timer for sending logs
    timeoutId = setTimeout(sendAndClear, TIMEOUT)

    callback?.()
  }
}

const transport = through.obj((log: Log, _enc: any, callback: any) => {
  handleLog(log, callback)
})

pump(process.stdin, split(safeParse), transport)
