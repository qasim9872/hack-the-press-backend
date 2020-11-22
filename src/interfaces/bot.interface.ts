import { Type, Static } from "@sinclair/typebox"
import { FastifyRequest } from "fastify/types/request"

// Get All

export const GetBotsQueryFilter = Type.Object({
  name: Type.Optional(Type.String()),
  phoneNumber: Type.Optional(Type.String()),
})

export type GetBotsQueryFilter = Static<typeof GetBotsQueryFilter>

export type GetBotsRequest = FastifyRequest<{
  Querystring: GetBotsQueryFilter
}>

// Get With Id

export const GetBotWithId = Type.Object({
  id: Type.String(),
})

export type GetBotWithId = Static<typeof GetBotWithId>

export type BotWithIdRequest = FastifyRequest<{
  Params: GetBotWithId
}>

// Get With Intent Query

export const BotIntentQuery = Type.Object({
  intent: Type.Optional(Type.String()),
})

export type BotIntentQuery = Static<typeof BotIntentQuery>

export type GetBotIntentRequest = FastifyRequest<{
  Params: GetBotWithId
  Querystring: BotIntentQuery
}>

// Post With Intent body

export const PostIntentBody = Type.Object({
  intent: Type.String(),
  response: Type.Array(Type.String(), { minItems: 1 }),
  config: Type.Optional(
    Type.Object({
      transfer: Type.Optional(Type.Boolean()),
      transferPreferences: Type.Optional(
        Type.Object({
          transferTarget: Type.Optional(Type.String()),
          transferWindow: Type.Optional(
            Type.Object({
              start: Type.Number(),
              end: Type.Number(),
            })
          ),
        })
      ),
      hangup: Type.Optional(Type.Boolean()),
    })
  ),
})

export type PostIntentBody = Static<typeof PostIntentBody>

export type PostBotIntentRequest = FastifyRequest<{
  Params: GetBotWithId
  Body: PostIntentBody
}>

// Create

export const CreateBotBody = Type.Object({
  name: Type.String(),
  details: Type.String(),
  phoneNumbers: Type.Array(Type.String(), {
    minItems: 1,
  }),
})

export type CreateBotBody = Static<typeof CreateBotBody>

export type CreateBotRequest = FastifyRequest<{
  Body: CreateBotBody
}>
