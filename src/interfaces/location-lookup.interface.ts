import { Type, Static } from "@sinclair/typebox"
import { FastifyRequest } from "fastify/types/request"

// Get With Lat Long

export const GetLocationQuery = Type.Object({
  lat: Type.String(),
  long: Type.String(),

  // lat: Type.Optional(Type.String()),
  // long: Type.Optional(Type.String()),
})

export type GetLocationQuery = Static<typeof GetLocationQuery>

export type GetLocationRequest = FastifyRequest<{
  Querystring: GetLocationQuery
}>
