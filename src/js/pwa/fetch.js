/*
  service worker network fetch event

  // require activate.js
*/
/* global domain domaincdn CACHE offlineAsset */


// application fetch network data
self.addEventListener('fetch', event => {

  // abandon non-GET requests
  if (event.request.method !== 'GET') return;

  let url = event.request.url;

  console.log('cache fetch  : ', url);
  event.respondWith(

    caches.open(CACHE)
      .then(cache => {

        return cache.match(event.request)
          .then(response => {

            // make network request if not in cache or is HTML
            let network;
            if (!response || (url.startsWith(domain) && event.request.headers.get('Accept').includes('text/html'))) {

              network = fetch(event.request)
                .then(newreq => {

                  console.log('network fetch: ', url);
                  if (newreq && newreq.ok && !url.startsWith(domain + 'ws/') && (url.startsWith(domain) || url.startsWith(domaincdn) || url.startsWith('https://fonts.'))) {
                    cache.put(event.request, newreq.clone());
                  }

                  return newreq;

                })
                // app is offline
                .catch(() => offlineAsset(url));

            }

            return response || network;

          });

      })

  );

});
