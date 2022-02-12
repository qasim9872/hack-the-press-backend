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

export async function search(filter: Omit<GetPostsQueryFilter, "tags"> & { tags?: string[] }) {
  const query: { [key: string]: any } = {
    ...filter,
  }

  if (filter.long && filter.lat) {
    const coordinates = [Number(filter.long), Number(filter.lat)]

    query.location = {
      $near: {
        $geometry: { type: "Point", coordinates },
        $maxDistance: query.radius,
      },
    }

    delete query.lat
    delete query.long
    delete query.radius
  }

  const posts = await PostsModel.find(query)

  return posts.map(format)
}

export async function fetchPost(id: string) {
  try {
    const post = await PostsModel.findById(id)
    if (!post) {
      throw new Boom(`Post with id: ${id} doesn't exist`, {
        statusCode: 400,
        message: `Post with id: ${id} doesn't exist`,
      })
    }

    return post
  } catch (err) {
    if ((err as any).kind === "ObjectId") {
      throw new Boom(`invalid id provided: ${id}`, {
        statusCode: 400,
        message: `invalid id provided: ${id}`,
      })
    }

    throw err
  }
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
