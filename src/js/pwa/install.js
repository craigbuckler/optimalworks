/*
  service worker installation event

  // require utils.js
*/
/* global installStaticFiles */

self.addEventListener('install', event => {

  console.log('service worker: install');

  // cache core files
  event.waitUntil(
    installStaticFiles()
      .then(() => self.skipWaiting())
  );

});
