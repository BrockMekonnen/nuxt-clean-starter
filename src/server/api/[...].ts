import { joinURL } from 'ufo'
import { getRequestURL, proxyRequest } from 'h3'

/**
 * BFF catch-all: browser calls `/api/*` (same origin); Nitro forwards to `apiUpstream`.
 * File must be `[...].ts` (not `[...path].ts`) so multi-segment paths like `/api/users/login` match.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const upstream = String(config.apiUpstream).replace(/\/$/, '')
  const url = getRequestURL(event)

  const suffix = url.pathname.replace(/^\/api\/?/, '')
  const target = joinURL(upstream, suffix) + url.search

  return proxyRequest(event, target)
})
