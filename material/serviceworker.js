/* eslint-disable no-console */
const CACHE_VERSION = 1
const CURRENT_CACHES = {
  prefetch: `prefetch-cache-v${CACHE_VERSION}`
}

self.addEventListener("install", event => {
  const now = Date.now()

  const urlsToPrefetch = ["404.html"]

  // All these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
  console.log("Handling install event. Resources to prefetch:", urlsToPrefetch)

  event.waitUntil(
    caches
      .open(CURRENT_CACHES.prefetch)
      .then(cache => {
        const cachePromises = urlsToPrefetch.map(urlToPrefetch => {
          // Constructs a new URL object using the script location as the base
          // for relative URLs.
          const url = new URL(urlToPrefetch, location.href)
          // Append a cache-bust URL parameter to each URL's query string.
          // This is particularly important when precaching resources
          // that are later used in the fetch handler as responses directly,
          // without consulting the network (i.e. cache-first).
          // If we were to get back a response from the HTTP browser cache
          // for this precaching request then that stale response would
          // be used indefinitely, or at least until the next time
          // the service worker script changes triggering the install flow.
          url.search += `${url.search ? "&" : "?"}cache-bust=${now}`

          // It's very important to use {mode: 'no-cors'} if there is any chance
          // that the resources being fetched are served off of a server that
          // doesn't support CORS.
          // In this example, chromium.org doesn't support CORS, and the fetch
          // would fail if the default mode of 'cors' was used for the request.
          // The drawback of hardcoding {mode: 'no-cors'} is that the response
          // from all cross-origin hosts will always be opaque
          // and it is not possible to determine whether an opaque response
          // represents a success or failure
          // (https://github.com/whatwg/fetch/issues/14).
          const request = new Request(url, { mode: "no-cors" })
          return fetch(request)
            .then(response => {
              if (response.status >= 400) {
                throw new Error(
                  `request for ${
                    urlToPrefetch
                  } failed with status ${
                    response.statusText}`
                )
              }

              // Use the original URL without the cache-busting parameter
              // as the key for cache.put().
              return cache.put(urlToPrefetch, response)
            })
            .catch(error => {
              console.error(
                `Not caching ${urlToPrefetch} due to ${error}`
              )
            })
        })

        return Promise.all(cachePromises).then(() => {
          console.log("Pre-fetching complete.")
        })
      })
      .catch(error => {
        console.error("Pre-fetching failed:", error)
      })
  )
})

self.addEventListener("activate", event => {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example,
  // the same logic will handle the case where
  // there are multiple versioned caches.
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map(key => {
    return CURRENT_CACHES[key]
  })

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected"
            // cache names, delete it.
            console.log("Deleting out of date cache:", cacheName)
            return caches.delete(cacheName)
          } else {
            return false
          }
        })
      )
    })
  )
})

self.addEventListener("fetch", event => {
  console.log("Handling fetch event for", event.request.url)

  event.respondWith(
    // caches.match() will look for a cache entry in all of the caches available
    // to the service worker. It's an alternative to first opening
    // a specific named cache and then matching on that.
    caches.match(event.request).then(response => {
      if (response) {
        console.log("Found response in cache:", response)

        return response
      }

      console.log("No response found in cache. About to fetch from network...")

      // event.request will always have the proper mode set
      // ('cors, 'no-cors', etc.) so we don't have to hardcode
      // 'no-cors' like we do when fetch()ing in the install handler.
      return fetch(event.request)
        // eslint-disable-next-line no-shadow
        .then(response => {
          console.log("Response from network is:", response)

          return response
        })
        .catch(error => {
          // This catch will handle exceptions thrown from the fetch operation.
          // Note that a HTTP error response will NOT trigger an exception.
          // It will return a normal response object that has the error code set
          console.error("Fetching failed:", error)

          throw error
        })
    })
  )
})
