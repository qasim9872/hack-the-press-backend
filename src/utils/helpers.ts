import { IS_PROD, PROTOCOL, HOST } from "@root/config/app.config"
import { FastifyRequest } from "fastify"
import { basename } from "path"
import urlLib from "url"

export function getRouteFromFileName(file: string) {
  let path = basename(file)

  // remove extension if present
  if (/.[t|j]s$/.test(path)) {
    path = path.slice(0, -3)
  }

  // check if filename is index
  if (/index$/.test(path)) {
    path = path.slice(0, -5)
  }

  return path ? `/${path}` : "/"
}

export function extractRequestUri(request: FastifyRequest) {
  // use protocol and host from config on deployed environment
  const protocol = IS_PROD ? PROTOCOL : request.protocol
  const host = IS_PROD ? HOST : request.headers.host
  const pathname = request.url

  return urlLib.format({
    protocol,
    host,
    pathname,
  })
}

export function unescapeValues<T extends object>(obj: T): T {
  return Object.entries(obj).reduce((agg: { [key: string]: string }, [key, value]) => {
    agg[key] = unescape(value)

    return agg
  }, {}) as T
}
