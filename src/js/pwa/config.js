/*
  service worker
*/

// configuration
'use strict';

const
  domain = '/* @echo rootURL */',
  version = '/* @echo version */',
  CACHE = version + '/* @echo PWAcache */',
  offlineURL = '/* @echo rootpath *//* @echo offlineURL */',
  installFilesEssential = [
    '/* @echo rootpath */',
    '/* @echo rootpath */manifest.json',
    '/* @echo rootpath */css/main.css',
    '/* @echo rootpath */js/main.js',
    '/* @echo rootpath */js/offlinepage.js'
  ].concat(offlineURL),
  installFilesDesirable = [
    'https://res.cloudinary.com/oworks/image/upload/v1513974725/works/offline.jpg',
    'https://res.cloudinary.com/oworks/image/upload/c_scale,w_800/v1513974725/works/offline.jpg',
    'https://res.cloudinary.com/oworks/image/upload/c_scale,w_24/v1513974725/works/offline.jpg'
  ];
