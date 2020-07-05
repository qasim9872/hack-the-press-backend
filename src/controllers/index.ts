import { Express } from "express"
import { Server } from "typescript-rest"
import { UserController } from "./users/user.controller"
import { HealthCheckController } from "./healthcheck.controller"

export function setupControllers(app: Express) {
    const controllers: any[] = [HealthCheckController, UserController]

    Server.buildServices(app, ...controllers)
}
