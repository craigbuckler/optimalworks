/*
  service worker activation event

  // require install.js
*/

/* global cacheClearOld */

// application activated event
self.addEventListener('activate', event => {

  console.log('service worker: activate');

  // delete old caches
  event.waitUntil(
    cacheClearOld()
      .then(() => self.clients.claim())
  );

});
