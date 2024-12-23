/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell.
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    } // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith("/_")) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// Caching CSS and JS files with CacheFirst strategy
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    (url.pathname.endsWith(".css") || url.pathname.endsWith(".js")),
  new CacheFirst({
    cacheName: "assets-cache",
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }), // Keep up to 50 files in cache
    ],
  })
);

// Caching font files with CacheFirst strategy
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    (url.pathname.endsWith(".woff2") || url.pathname.endsWith(".woff")),
  new CacheFirst({
    cacheName: "fonts-cache",
    plugins: [
      new ExpirationPlugin({ maxEntries: 20 }), // Keep up to 20 font files in cache
    ],
  })
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images-cache",
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size, the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// Handle requests to your API with StaleWhileRevalidate (fallback to cached data)
registerRoute(
  ({ url }) => url.origin === "http://localhost:3000/api/v1/landing/getLandingPageImages", // Replace with your API's origin
  new StaleWhileRevalidate({
    cacheName: "api-cache",
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

// Handle all fetch events for offline capability
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // For navigation requests, always return the index.html
    event.respondWith(caches.match("/index.html"));
  } else {
    // For other requests, try to fetch from the network and fallback to cache
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
