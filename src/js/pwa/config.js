/*
  service worker
*/

// configuration
'use strict';

const
  domain = '/* @echo rootURL */',
  domaincdn = '/* @echo imagecdn */',
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
    '/* @echo imagecdn */f_auto/v1513974725/works/offline',
    '/* @echo imagecdn */f_auto,c_scale,w_800/v1513974725/works/offline',
    '/* @echo imagecdn */f_auto,c_scale,w_24/v1513974725/works/offline'
  ];
