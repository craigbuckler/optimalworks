/*
Browser API Polyfills
*/

(function () {

  // Math.sign
  if (!Math.sign) Math.sign = function(val) {
    val = +val;
    if (val) return val > 0 ? 1 : -1;
    else return 0;
  };

  // CustomEvent (IE)
  if (typeof window.CustomEvent === 'function') return;

  function CustomEvent (event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;

})();
