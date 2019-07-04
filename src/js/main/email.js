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
      em = (ds || e.textContent),
      es = em.replace(/\sdot\s/ig, '.').replace(/\{at\}/ig,'@').replace(/\s/g,'');

    if (em !== es) {
      e.href = 'ma' + 'ilt' + 'o:' + es;
      if (!ds) e.textContent = es;
    }

  });

})();
