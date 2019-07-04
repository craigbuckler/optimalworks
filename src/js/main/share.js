/*
  native OS share

  // requires: lib.js
*/
/* global ow */

(function() {

  'use strict';

  // sharing supported?
  if (!navigator.share || !document.body.classList) return;

  var
    cfg = {
      shareClass: 'share',
      linkClass: 'linkable'
    },
    shareLink = ow.lib.className(cfg.shareClass);

  // no links
  if (!shareLink.length) return;

  // make linkable
  ow.lib.each(shareLink, function(e) {
    e.tabIndex = 0;
    e.classList.add(cfg.linkClass);
  });

  // share click handler
  document.body.addEventListener('click', function(e) {

    // share clicked?
    if (!e.target.classList.contains(cfg.shareClass)) return;

    // share API call
    navigator.share(ow.lib.pageInfo());

  }, false);

})();
