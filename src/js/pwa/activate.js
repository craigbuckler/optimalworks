/*
  service worker activation event

  // require install.js
*/

/* global clearOldCaches */

// application activated event
self.addEventListener('activate', event => {

  console.log('service worker: activate');

  // delete old caches
  event.waitUntil(
    clearOldCaches()
      .then(() => self.clients.claim())
  );

});
