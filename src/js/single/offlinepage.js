/*
Populate offline pages list
loaded as a separate ES6 file to ensure it is not parsed by older browsers
*/
(async () => {

  'use strict';

  // populate element
  const list = document.getElementById('/* @echo offlineList */');
  if (!list) return;

  // cache name
  const
    CACHE = '/* @echo version *//* @echo PWAcache */',
    rootURL = '/* @echo rootURL */',
    invalidURL = [
      '/* @echo imagecdn */',     // image CDN
      '/error/',                  // error page
      '/* @echo offlineURL */',   // offline URL
    ],

    // all caches
    cacheAll = await caches.keys(),

    // match cache, get latest
    cacheList = cacheAll
      .filter(cName => cName.includes(CACHE))
      .sort((a, b) => a - b),

    // open cache
    cache = await caches.open(cacheList[0]),

    // get response keys
    keyList = await cache.keys(),

    // filter and sort valid responses
    reqList = keyList
      .filter(req => (req.url.endsWith('/') || req.url.endsWith('.html')) && invalidURL.every(u => !req.url.includes(u)))
      .sort((a, b) => a.url > b.url),

    // fetch cached items
    matchList = await Promise.allSettled(
      reqList.map( req => cache.match(req) )
    ),

    // get text
    bodyList = await Promise.allSettled(
      matchList.map( match => match.value && match.value.text() )
    ),

    // extract titles
    titleList = bodyList
      .map( body => {
        let title = body.value && body.value.match(/<title>(.*)<\/title>/);
        return (title && title.length && title[1].replace(/\s\|.+$/, '')) || null;
      }),

    // DOM update
    frag = document.createDocumentFragment();

  // build link list
  let parentURL, parentTitle;
  reqList.forEach((req, idx) => {

    let title = titleList[idx];
    if (!title) return;

    let
      li = document.createElement('li'),
      a = li.appendChild( document.createElement('a') ),
      hasParent = req.url.startsWith(parentURL);

    a.setAttribute('href', req.url);
    a.textContent = (hasParent ? parentTitle + ' » ' : '') + title;
    frag.appendChild(li);

    if (!hasParent && req.url !== rootURL) {
      parentURL = req.url;
      parentTitle = title;
    }

  });

  // append list to DOM
  list.appendChild(frag);

})();
