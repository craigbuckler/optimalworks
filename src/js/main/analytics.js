/*
  Google Analytics

  // requires: lib.js
*/
/* global ow gtag dataLayer */
(function() {

  'use strict';

  if (!ow.analytics || ow.devBuild || location.host.indexOf('.net') < 0 || !document.head) return;

  // load analytics API
  setTimeout(function() {

    var gScript = document.createElement('script');
    gScript.onload = initAnalytics;
    gScript.async = 1;
    document.head.appendChild(gScript);
    gScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + ow.analytics;

  }, 200);


  // initialise Analytics
  function initAnalytics() {

    // record page view
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', ow.analytics);

    // telephone/mail custom event
    if (window.addEventListener) document.body.addEventListener('click', function(e) {

      if (typeof gtag === 'undefined' || !e || !e.target || !e.target.href) return;

      var type = String(e.target.href).trim().toLowerCase().match(/^[^:]+:/);
      if (!type || !type.length) return;
      type = type[0];

      // record event
      if (type === 'tel:' || type === 'mailto:') {
        gtag('event', 'contact', { 'method': type.slice(0, -1) });
      }

    }, false);

  }

})();
