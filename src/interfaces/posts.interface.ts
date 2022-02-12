import { Type, Static } from "@sinclair/typebox"
import { FastifyRequest } from "fastify/types/request"

// Get All

export const GetPostsQueryFilter = Type.Object({
  name: Type.Optional(Type.String()),
  text: Type.Optional(Type.String()),
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
})

export type CreatePostBody = Static<typeof CreatePostBody>

export type CreatePostRequest = FastifyRequest<{
  Body: CreatePostBody
}>
