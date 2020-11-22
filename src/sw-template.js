import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
      workbox.skipWaiting();
      workbox.clientsClaim();

      // cache name
      workbox.core.setCacheNameDetails({
         prefix: "HelloSW",
         precache: "precache",
         runtime: "runtime",
      });
    /* injection point for manifest files.  */
    //  workbox.precaching.precacheAndRoute([]);
   //  precacheAndRoute(self.__WB_MANIFEST);
    workbox.precaching.precacheAndRoute(self.__precacheManifest);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute("/index.html", {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    //  workbox.routing.registerRoute(
    //    /\.(?:png|gif|jpg|jpeg)$/,
    //    workbox.strategies.cacheFirst({
    //      cacheName: "images",
    //      plugins: [
    //        new workbox.expiration.Plugin({
    //          maxEntries: 60,
    //          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
    //        }),
    //      ],
    //    })
    //  );
    // 1. css/js/manifest
    workbox.routing.registerRoute(
      new RegExp(".(css|js|json)$"),
      new workbox.strategies.CacheFirst({
        cacheName: "cache-JS/CSS/JSON",
        plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
            maxEntries: 20, // only cache 20 request
            purgeOnQuotaError: true,
          }),
        ],
      })
    );
    // 2. images
    workbox.routing.registerRoute(
      new RegExp(".(png|svg|jpg|jpeg)$"),
      new workbox.strategies.CacheFirst({
        cacheName: "cache-images",
        plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 7,
            maxEntries: 50,
            purgeOnQuotaError: true,
          }),
        ],
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
