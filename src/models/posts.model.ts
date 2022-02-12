import "mongoose-geojson-schema"
import timestamps from "mongoose-timestamp"
import { Document, Schema, model } from "mongoose"

export interface Posts extends Document {
  name: string
  text: string
}

const postsSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  loc: Schema.Types.GeoJSON,
}).plugin(timestamps)

export const PostsModel = model<Posts>("Posts", postsSchema)

// Testing

const post = {
  name: "This is the post name",
  text: "This is the post data",
  loc: {
    type: "Point",
    coordinates: [0, 0],
  },
}

async function test() {
  console.log("here")
}
test()
