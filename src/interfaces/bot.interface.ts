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
