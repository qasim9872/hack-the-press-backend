import "mongoose-geojson-schema"
import timestamps from "mongoose-timestamp"
import { Document, Schema, model } from "mongoose"

export interface Posts extends Document {
  name: string
  text: string

  title: string
  locationName: string
  postingType: string // News | Event |  General
  tags: string[] // Historical Landmark | Food | Music | Charity Drop off
  createdAt: Date
  updatedAt: Date

  location: {
    type: string
    coordinates: any[]
  }
}

const postsSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },

  title: { type: String, required: true },
  locationName: { type: String, required: true },
  postingType: { type: String, required: true },
  tags: { type: Array, required: true },

  location: Schema.Types.GeoJSON,
}).plugin(timestamps)

postsSchema.index({ location: "2dsphere" })
export const PostsModel = model<Posts>("Posts", postsSchema)
