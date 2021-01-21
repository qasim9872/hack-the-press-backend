import { Type, Static } from "@sinclair/typebox"
import { FastifyRequest } from "fastify/types/request"

export const HeaderSchema = Type.Object({
  "x-twilio-signature": Type.String(),
})

export const BodySchema = Type.Object({
  Called: Type.Optional(Type.String()),
  CalledCountry: Type.Optional(Type.String()),

  Caller: Type.Optional(Type.String()),
  CallerCountry: Type.Optional(Type.String()),

  CallSid: Type.String(),
  CallStatus: Type.String(),

  Direction: Type.String(),
  From: Type.String(),
  FromCountry: Type.Optional(Type.String()),
  To: Type.String(),
  ToCountry: Type.Optional(Type.String()),

  // input values
  Language: Type.Optional(Type.String()),
  Digits: Type.Optional(Type.String()),
  SpeechResult: Type.Optional(Type.String()),
  Confidence: Type.Optional(Type.Number()),
})

export type IHeader = Static<typeof HeaderSchema>

export type IBody = Static<typeof BodySchema>

export type TwilioRequest = FastifyRequest<{
  Body: IBody
  Headers: IHeader
}>
