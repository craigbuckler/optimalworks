/*
  clipboard copy

  // requires: lib.js
*/
/* global ow */

(function() {

  'use strict';

  // not supported
  if (!document.queryCommandSupported('copy')) return;

  var
    cfg = {
      copier:     'data-copyable',
      done:       'data-copyable-done',
      linkClass:  'linkable'
    },
    copyLink = ow.lib.queryAll('[' + cfg.copier + ']');

  // no links
  if (!copyLink.length) return;

  // make linkable
  ow.lib.each(copyLink, function(e) {
    e.tabIndex = 0;
    e.classList.add(cfg.linkClass);
  });

  // copy click handler
  document.body.addEventListener('click', function(e) {

    // copy clicked?
    var t = e.target, v = t.getAttribute(cfg.copier);
    if (v === null) return;

    var field, input, copied = t.getAttribute(cfg.done);

    if (v) {
      input = document.createElement('input');
      input.value = ow.lib.tokenReplace(v, ow.lib.pageInfo());
      field = document.body.appendChild(input);
    }
    else if (t.htmlFor) {
      field = ow.lib.id(t.htmlFor);
    }

    if (!field) return;

    if (field.select && field.value) {

      // form input
      field.select();
      try {
        document.execCommand('copy');
      }
      catch(err) {
        copied = false;
      }

    }
    else if (window.getSelection) {

      console.log('getSelection');

      // DOM element
      try {
        var range = document.createRange();
        range.selectNode(field);
        window.getSelection().addRange(range);
        document.execCommand('copy');
      }
      catch(err) {
        copied = false;
      }

    }
    else copied = false;

    // remove input
    if (input) document.body.removeChild(field);

    // change element text
    if (copied) t.textContent = copied;

  }, false);

})();
