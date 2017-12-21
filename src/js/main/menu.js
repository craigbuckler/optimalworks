/*
	menu handler

	// requires: lib.js
*/
/* global ow */
(function() {

  'use strict';

  var
    menuOpener = ow.lib.id(ow.menuOpener),
    menu = ow.lib.id(ow.menuId);

  if (!menuOpener || !menu || !window.addEventListener || !document.body.classList) return;

  // menu is active
  menu.parentNode.classList.add('active');

  // hamburger
  menuOpener.addEventListener('click', function(e) {

    menu.classList.toggle('open');
    document.body.classList.toggle('menuopen');
    e.preventDefault();
    e.stopPropagation();

  }, false);


  // body
  document.body.addEventListener('click', function(e) {

    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      document.body.classList.remove('menuopen');
    }

  });


  // expand/contract event handlers
  menu.addEventListener('click', function(e) {

    var t = e.target;
    if (t.hash === '#open') {

      var li = ow.lib.closest('li', t);
      if (li) li.classList.toggle('open');
      e.preventDefault();
      e.stopPropagation();

    }

  }, false);

})();
