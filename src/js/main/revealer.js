/*
	Revealer animation

	// requires: lib.js
*/
if ('IntersectionObserver' in window) window.addEventListener('load', function() {

  'use strict';

  var
    name = 'revealer',  // data name
    minDelay = 300,     // minimum delay between each animation

    nextTime = 0,
    rNode = document.querySelectorAll('[data-' + name + ']'),
    observer = new IntersectionObserver(
      function(entries) {

        entries.forEach(function(entry) {

          let t = entry.target, r = (t.dataset[name] || '').trim();

          if (entry.isIntersecting && r) {

            var now = +new Date();
            if (nextTime < now) nextTime = now;

            observer.unobserve(t);
            setTimeout(function() {
              requestAnimationFrame(function() {
                t.className += ' ' + r;
              });
            }, t.dataset.delay || nextTime - now);

            nextTime += minDelay;

          }

        });

      },
      { threshold: 0.3 }
    );

  // initialise off-screen components
  var wH = window.innerHeight, cRect, cT, cH, i, t;
  for (i = 0; i < rNode.length; i++) {

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
