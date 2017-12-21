/*
  Google Analytics

  // requires: lib.js
*/
/* global ow ga */
(function() {

  'use strict';

  if (ow.devBuild || location.host.indexOf('.net') < 0) return;

  // load analytics API
  setTimeout(function() {

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    // record page view
    ga('create', ow.analytics, 'auto');
    ga('send', 'pageview');

    // telephone/mail custom event
    if (window.addEventListener) document.body.addEventListener('click', function(e) {

      if (typeof ga === 'undefined' || !e || !e.target || !e.target.href) return;
      var type = String(e.target.href).trim().toLowerCase().match(/^[^:]+:/);
      if (!type || !type.length) return;
      type = type[0];

      // record custom event
      if (type === 'tel:' || type === 'mailto:') {
        ga('send', 'event', 'contact', type.slice(0, -1));
      }

    }, false);

  }, 200);

})();
