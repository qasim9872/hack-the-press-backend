import { Document, Schema, model } from "mongoose"

export interface Posts extends Document {
  name: string
  text: string
}

const postsSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
})

export const PostsModel = model<Posts>("Posts", postsSchema)
