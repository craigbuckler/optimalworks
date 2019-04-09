/*
  Enable PWA service worker

  // requires: config.js
*/
/* global ow */

(function() {

  'use strict';

  if (!ow.pwa) return;

  // enable service worker
  if ('serviceWorker' in navigator) {

    // register service worker
    navigator.serviceWorker.register('/* @echo rootpath */sw.js');

    // load script to populate offline page list
    if (document.getElementById('/* @echo offlineList */') && 'caches' in window) {
      var scr = document.createElement('script');
      scr.src = '/* @echo rootpath */js/offlinepage-/* @echo versionFile */.js';
      scr.async = 1;
      document.head.appendChild(scr);
    }

  }

  // add to home screen
  var
    install = document.getElementById('install'),
    deferredPrompt;

  if (!install) return;

  // PWA can be installed
  window.addEventListener('beforeinstallprompt', function(e) {

    e.preventDefault();
    deferredPrompt = e;
    install.style.display = 'block';

  }, false);

  // install click
  install.addEventListener('click', function(e) {

    e.preventDefault();
    if (!deferredPrompt) return;

    install.style.display = 'none';

    deferredPrompt.prompt();
    deferredPrompt.userChoice
      .then(function(choice) {
        if (choice.outcome === 'accepted') {
          console.log('PWA installed');
        }
        deferredPrompt = null;
      });

  }, false);

})();
