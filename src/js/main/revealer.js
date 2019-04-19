/*
	Revealer animation

	// requires: lib.js
*/
if ('IntersectionObserver' in window) window.addEventListener('DOMContentLoaded', function() {

  'use strict';

  var
    cfg = {
      name: 'revealer',     // revealer class data name, e.g. data-revealer="animationClass"
      delay: 'delay',       // revealer delay data name, e.g. data-delay="100"
      root: null,           // root element (null for viewport)
      rootMargin: '0px',    // margin around root element
      threshold: 0.6,       // proportion of element visible before triggering animation
      minDelay: 300         // minimum delay between each animation unless set with data-delay
    },

    rNode = document.querySelectorAll('[data-' + cfg.name + ']');

  var rN = rNode.length;
  if (!rN) return;

  // hide components
  for (var i = 0; i < rN; i++) rNode[i].classList.add(cfg.name);

  // observe all components
  console.log(document.readyState);
  if (document.readyState === 'complete') observe();
  else window.addEventListener('load', observe, false);

  function observe() {

    var
      nextTime = 0,
      observer = new IntersectionObserver(

        function(entries) {

          entries.forEach(function(entry) {

            var t = entry.target, rCls = (t.dataset[cfg.name] || '').trim();

            if (!rCls || entry.intersectionRatio < cfg.threshold) return;

            // component in view
            var d = t.dataset[cfg.delay], now = +new Date();
            if (nextTime < now) nextTime = now;

            // unobserve
            observer.unobserve(t);

            // reveal after delay
            setTimeout(function() {
              requestAnimationFrame(function() {
                t.className += ' ' + rCls;
              });
            }, d !== undefined ? d : nextTime - now);

            nextTime += cfg.minDelay;

          });

        },
        {
          root: cfg.root,
          rootMargin: cfg.rootMargin,
          threshold: cfg.threshold
        }
      );

    for (var i = 0; i < rN; i++) observer.observe(rNode[i]);

  }

}, false);
