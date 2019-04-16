/*
  service worker installation event

  // require utils.js
*/
/* global cacheInstall */

self.addEventListener('install', event => {

  console.log('service worker: install');

  // cache core files
  event.waitUntil(
    cacheInstall()
      .then(() => self.skipWaiting())
  );

});
