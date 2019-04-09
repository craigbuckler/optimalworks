/*
	Revealer animation

	// requires: lib.js
*/
if ('IntersectionObserver' in window) window.addEventListener('load', function() {

  'use strict';

  var
    name = 'revealer',

    rNode = document.querySelectorAll('[data-' + name + ']'),
    observer = new IntersectionObserver(
      function(entries) {

        entries.forEach(function(entry) {

          let t = entry.target, r = (t.dataset[name] || '').trim();

          if (entry.isIntersecting && r) {
            observer.unobserve(t);
            setTimeout(function() {
              requestAnimationFrame(function() {
                t.className += ' ' + r;
              });
            }, t.dataset.delay || 1);
          }

        });

      },
      { threshold: 0.3 }
    );

  // initialise off-screen components
  var wH = window.innerHeight, cRect, cT, cH, i, t;
  for (i = rNode.length - 1; i >= 0; i--) {

    t = rNode[i];
    cRect = t.getBoundingClientRect();
    cT = cRect.top;
    cH = cRect.height;

    if (!(0 < cT + cH && wH > cT)) {
      t.classList.add(name);
      observer.observe(t);
    }

  }

}, false);
