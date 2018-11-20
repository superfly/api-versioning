import backends from './lib/backends'
import { forceSSL } from './lib/utilities'

/**
 * Specify handler to use during requests. We can do basic middleware by
 * wrapping fetch like functions.
 */
const handler = forceSSL(routeMounts)

/**
 * Respond to HTTP requests with the handler defined above
 */
fly.http.respondWith(handler)

/**
 * This is a mount mapping: `/path => fetch(req)`
 */
const mounts = {
  '/api/v2': backends.generic("https://randomuser.me/api/1.2/", {'host': "randomuser.me"}),
  '/api/v1': backends.generic("https://randomuser.me/api/1.1/", {'host': "randomuser.me"}),
  '/api/v0': backends.generic("https://randomuser.me/api/1.0/", {'host': "randomuser.me"}),
  '/': backends.generic("https://randomuser.me", {'host': "randomuser.me"})
}

async function routeMounts(req) {
  const url = new URL(req.url)
  for (const path of Object.getOwnPropertyNames(mounts)) {
    const trailingSlash = path[path.length - 1] === '/'
    const backend = mounts[path]
    const basePath = path + (!trailingSlash && "/" || "")
    // handle mounts that end in a trailing slash
    if (trailingSlash && url.pathname.startsWith(path)) {
      return await backend(req, basePath)
    }

    // handle /path
    if (url.pathname === path || url.pathname.startsWith(path + "/")) {
      return await backend(req, basePath)
    }
  }
  return new Response("not found", { status: 404 })
}