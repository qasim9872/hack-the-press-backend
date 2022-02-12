import { Type, Static } from "@sinclair/typebox"
import { FastifyRequest } from "fastify/types/request"

// Get All

export const GetPostsQueryFilter = Type.Object({
  // name: Type.Optional(Type.String()),
  // text: Type.Optional(Type.String()),

  // title: Type.Optional(Type.String()),
  // locationName: Type.Optional(Type.String()),

  postingType: Type.Optional(Type.String()), // News | Event |  General
  tags: Type.Optional(Type.String()), // Historical Landmark | Food | Music | Charity Drop off

  lat: Type.Optional(Type.String()),
  long: Type.Optional(Type.String()),
  radius: Type.Optional(Type.Number()),
})

export type GetPostsQueryFilter = Static<typeof GetPostsQueryFilter>

export type GetPostsRequest = FastifyRequest<{
  Querystring: GetPostsQueryFilter
}>

// Get With Id

export const GetPostWithId = Type.Object({
  id: Type.String(),
})

export type GetPostWithId = Static<typeof GetPostWithId>

export type PostWithIdRequest = FastifyRequest<{
  Params: GetPostWithId
}>

// Create

export const CreatePostBody = Type.Object({
  name: Type.String(),
  text: Type.String(),

  title: Type.String(),
  locationName: Type.String(),
  postingType: Type.String(), // News | Event |  General
  tags: Type.Array(Type.String()), // Historical Landmark | Food | Music | Charity Drop off

  lat: Type.String(),
  long: Type.String(),
})

export type CreatePostBody = Static<typeof CreatePostBody>

export type CreatePostRequest = FastifyRequest<{
  Body: CreatePostBody
}>
