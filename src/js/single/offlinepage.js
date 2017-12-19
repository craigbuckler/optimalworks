/*
Populate offline pages list
loaded as a separate ES6 file to ensure it is not parsed by older browsers
*/

'use strict';

// cache name
const
  CACHE = '/* @echo PWAcache */',
  offlineURL = '/* @echo offlineURL */',
  list = document.getElementById('/* @echo offlineList */');

// fetch all caches
window.caches.keys()
  .then(cacheList => {

    // find caches by and order by most recent
    cacheList = cacheList
      .filter(cName => cName.includes(CACHE))
      .sort((a, b) => a - b);

    // open first cache
    caches.open(cacheList[0])
      .then(cache => {

        // fetch cached pages
        cache.keys()
          .then(reqList => {

            let frag = document.createDocumentFragment();

            reqList
              .map(req => req.url)
              .filter(req => (req.endsWith('/') || req.endsWith('.html')) && !req.endsWith(offlineURL) && req !== '/error/')
              .sort()
              .forEach(req => {
                let
                  li = document.createElement('li'),
                  a = li.appendChild(document.createElement('a'));
                a.setAttribute('href', req);
                a.textContent = a.pathname;
                frag.appendChild(li);
              });

            if (list) list.appendChild(frag);

          });

      });

  });
