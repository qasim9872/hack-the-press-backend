import { Posts, PostsModel } from "@root/models/posts.model"
import { CreatePostBody, GetPostsQueryFilter } from "@root/interfaces/posts.interface"
import Boom from "boom"

export function format(post: Posts) {
  // TODO - create format function
  return post
}

export async function createCreatePostBody(postRequest: CreatePostBody) {
  const post = await PostsModel.create(postRequest)

  return format(post)
}
