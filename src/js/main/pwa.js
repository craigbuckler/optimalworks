/*
  Enable PWA service worker

  // requires: config.js
*/
/* global ow */

(function() {

  'use strict';

  // enable service worker
  if (ow.pwa && 'serviceWorker' in navigator) {

  // register service worker
    navigator.serviceWorker.register('/* @echo rootpath */sw.js');

    // load script to populate offline page list
    if (document.getElementById('/* @echo offlineList */') && 'caches' in window) {
      var scr = document.createElement('script');
      scr.src = '/* @echo rootpath */js/offlinepage.js';
      scr.async = 1;
      document.head.appendChild(scr);
    }

  }

})();
