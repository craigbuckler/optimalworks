/*
  open social links in a new window

  // requires: lib.js
*/
/* global ow */

(function() {

  'use strict';

  var
    cfg = {
      name:   'social',
      width:  600,
      height: 600,
      margin: 20
    };

  if (!document.body.classList || !ow.lib.className(cfg.name)) return;

  // social link event handler
  document.body.addEventListener('click', function(e) {

    // is a social link?
    var popup, t = e.target, url = t.href;
    if (!url || !t.classList.contains(cfg.name)) return;

    // stop link
    e.preventDefault();

    // replace tokens
    url = ow.lib.tokenReplace(url, ow.lib.pageInfo(), true);


    // ignore non-browser protocols
    if ((t.protocol || 'http').indexOf('http') === 0) {

      // open popup
      var
        sw = screen.availWidth || 1024,
        sh = screen.availHeight || 700,
        pw = Math.min(cfg.width, (sw - cfg.margin * 2)),
        ph = Math.min(cfg.height, (sh - cfg.margin * 2)),
        px = Math.floor((sw - pw) / 2),
        py = Math.floor((sh - ph) / 2);

      popup = window.open(
        url,
        cfg.name,
        'width=' + pw +
        ',height=' + ph +
        ',left=' + px +
        ',top=' + py +
        ',location=0,menubar=0,toolbar=0,personalbar=0,status=0,scrollbars=1,resizable=1'
      );

    }

    if (popup) popup.focus();
    else location.href = url;

  }, false);

})();
