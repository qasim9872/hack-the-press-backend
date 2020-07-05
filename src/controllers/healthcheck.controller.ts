import { GET, Path } from "typescript-rest"

/**
 * The health check endpoint is for validating that the service is reachable
 */
@Path("/healthcheck")
export class HealthCheckController {
    /**
     * Send 200 OK
     */
    @GET
    public healthCheck(): string {
        return "OK"
    }
}
