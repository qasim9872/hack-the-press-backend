import fastify from "fastify"
import fp from "fastify-plugin"
import klaw from "klaw"

import logger from "../logger"
import { FastifyApp } from "../../types"

type MATCH = string | string[]
export const MATCH = [".route.ts", ".route.js"]
const ALLOWED_KEYS = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD", "CONNECT", "TRACE"]

export interface RouteLoaderOptions {
    /**
     * The directory with the files to be loaded
     */
    directory: string

    /**
     * match used to filter files to load
     * @default [".route.ts", ".route.js"]
     */
    match?: MATCH

    /**
     * will remove the matched path from the final url
     * @default true
     */
    removeMatchedPath?: boolean
}

function checkMatch(path: string, match: MATCH) {
    const matchArray: string[] = typeof match === "string" ? [match] : match

    for (const matchItem of matchArray) {
        if (path.includes(matchItem)) {
            return matchItem
        }
    }

    return false
}

function processModule(app: any, routeModule: any, path: string) {
    for (const [key, value] of Object.entries(routeModule)) {
        const method = key.toUpperCase()
        if (ALLOWED_KEYS.includes(method)) {
            const handler = value as fastify.DynamicRouteHandler
            app[method.toLowerCase()](path, handler.opts || {}, handler)
        }
    }
}

async function loadRoutes(app: FastifyApp, base: string, match: MATCH, removeMatchedPath: boolean) {
    for await (const { path: filePath } of klaw(base)) {
        // remove the base path
        let path = filePath.replace(base, "")

        // klaw also returns the root folder so we need to ignore it
        if (path === "") {
            continue
        }

        // if the path is not matched, we should ignore the file
        const matchedPath = checkMatch(path, match)
        if (!matchedPath) {
            logger.warn(`ignoring file: ${path}`)
            continue
        }

        if (removeMatchedPath) {
            path = path.replace(matchedPath, "")
        }

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        processModule(app, require(filePath), path)
    }
}

export default fp(async (app: FastifyApp, opts: RouteLoaderOptions, done: (err?: Error) => void) => {
    if (!opts || !opts.directory) {
        done(new Error("route-loader: must provide opts.directory"))
        return
    }

    const { directory, match, removeMatchedPath } = opts
    logger.debug(`loading routes from ${directory}`)

    await loadRoutes(app, directory, match || MATCH, removeMatchedPath || true)

    done()
})

declare module "fastify" {
    interface DynamicRouteHandler extends fastify.RequestHandler {
        opts?: fastify.RouteShorthandOptions
    }
}
