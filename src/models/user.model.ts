import timestamps from "mongoose-timestamp"
import { plugin, prop, getModelForClass } from "@typegoose/typegoose"

export interface User {
    name: string
}

@plugin(timestamps)
export class User implements User {
    @prop({ required: true })
    public name!: string
}

export const UserModel = getModelForClass(User)
