import timestamps from "mongoose-timestamp"
import { plugin, prop, getModelForClass } from "@typegoose/typegoose"

import { UserInterface } from "../interfaces/user.interface"

@plugin(timestamps)
export class User implements UserInterface {
    @prop({ required: true })
    public name!: string
}

export const UserModel = getModelForClass(User)
