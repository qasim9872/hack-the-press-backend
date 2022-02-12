import { Posts, PostsModel } from "@root/models/posts.model"
import { CreatePostBody, GetPostsQueryFilter } from "@root/interfaces/posts.interface"

import Boom from "boom"

export function format(post: Posts) {
  //  create format function
  const result = post.toJSON()

  const [long, lat] = result.location.coordinates
  result.long = long
  result.lat = lat

  result.id = result._id

  delete result.location
  delete result._id

  return result
}

export async function search(filter: GetPostsQueryFilter) {
  const query: { [key: string]: any } = {
    ...filter,
  }

  if (filter.long && filter.lat) {
    const coordinates = [Number(filter.long), Number(filter.lat)]

    query.location = {
      $near: {
        $geometry: { type: "Point", coordinates },
      },
    }

    delete query.lat
    delete query.long
  }

  const posts = await PostsModel.find(query)

  return posts.map(format)
}

export async function createCreatePostBody(postRequest: CreatePostBody) {
  const location = {
    type: "Point",
    coordinates: [Number(postRequest.long), Number(postRequest.lat)],
  }

  const post = await PostsModel.create({
    name: postRequest.name,
    text: postRequest.text,
    title: postRequest.title,
    locationName: postRequest.locationName,
    postingType: postRequest.postingType,
    tags: postRequest.tags,

    location,
  } as any)

  return format(post)
}
