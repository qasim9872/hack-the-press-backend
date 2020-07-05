import { POST, GET, Path } from "typescript-rest"
import { User, UserModel } from "../models/user.model"

/**
 * The health check endpoint is for validating that the service is reachable
 */
@Path("/user")
export class UserController {
    /**
     * Creates a new user
     * @param newRecord admin data
     * @return User new admin
     */
    @POST
    public async create(newRecord: User): Promise<User> {
        return (await UserModel.create(newRecord)).toObject()
    }

    /**
     * Get all users
     * @return User<Array>
     */
    @GET
    public async getAll(): Promise<User[]> {
        return UserModel.find()
    }
}
