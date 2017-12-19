/*
	email parser

	// requires: lib.js
*/
/* global ow */

(function() {

  'use strict';

  ow.lib.each(ow.lib.queryAll(ow.emailElement), function(e) {
    var
      ds = e.getAttribute('data-email'),
      es = (ds || e.firstChild.nodeValue).replace(/\sdot\s/ig, '.').replace(/\{at\}/ig,'@').replace(/\s/g,'');
    e.href = 'ma' + 'ilt' + 'o:' + es;
    if (!ds) e.firstChild.nodeValue = es;
  });

})();
