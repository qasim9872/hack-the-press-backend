import { IsString } from "class-validator"
import { UserInterface } from "../interfaces/user.interface"

export class UserSchema implements UserInterface {
    @IsString()
    public name!: string
}
