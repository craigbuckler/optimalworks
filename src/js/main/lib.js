/*
	Utility library

	// requires: config.js polyfills.js pwa.js
*/
/* global ow */

ow.lib = (function() {

  'use strict';


  // JavaScript active
  if (document.body.classList) document.body.classList.add('js');


  // each
  function each(obj, fn) {
    if (obj.length || obj.length === 0) for (var i = 0, ol = obj.length, v = obj[0]; i < ol && fn(v, i) !== false; v = obj[++i]);
    else for (var p in obj) if (fn(obj[p], p) === false) break;
  }

/*
  // returns true if all passed values are similar (ignore case, spacing, etc)
  function similar() {
    var same = true, i = 0, a, match;
    while (same && i < arguments.length) {
      a = arguments[i].replace(/\W/g,'').toLowerCase();
      if (i === 0) match = a;
      else same = (a == match);
      i++;
    }
    return same;
  }


  // pad a string
  function pad(str, len, chr) {
    str = String(str);
    len = len || 2;
    chr = chr || '0';
    while (str.length < len) str = chr + str;
    return str;
  }


  // to integer
  function int(num) {
    return parseInt(num, 10) || 0;
  }
*/

  // getElementsById
  function id(idName) {
    return document.getElementById(idName);
  }

/*
  // getElementsByTagName
  function tag(tagName, doc) {
    doc = doc || document;
    return doc.getElementsByTagName(tagName);
  }
*/

  // getElementsByClassName
  function className(cn, doc) {
    doc = doc || document;
    return doc.getElementsByClassName(cn);
  }


  // querySelector
  function query(sel, doc) {
    doc = doc || document;
    return doc.querySelector(sel);
  }


  // querySelectorAll
  function queryAll(sel, doc) {
    doc = doc || document;
    return doc.querySelectorAll(sel);
  }


  // closest
  function closest(type, node) {
    type = type.toUpperCase();
    var pNode = null;
    while(!pNode && node.parentNode) {
      if (node.nodeName == type) pNode = node;
      node = node.parentNode;
    }
    return pNode;
  }

/*
  // remove all child nodes
  function empty(node) {
    while (node.lastChild) node.removeChild(node.lastChild);
  }


  // update a select drop-down
  function setSelect(select, value) {
    var s = 0, si = -1;

    while (si < 0 && s < select.options.length) {
      if (select.options[s].value == value) si = s;
      s++;
    }

    if (si >= 0) select.selectedIndex = si;
    return si;
  }


  // get computed style
  function appliedStyle(node, prop) {
    return window.getComputedStyle(node, null).getPropertyValue(prop);
  }


  // top position
  function posTop(node) {
    var top = 0;
    do {
      top += node.offsetTop;
    } while ((node = node.offsetParent));
    return top;
  }


  // left position
  function posLeft(node) {
    var left = 0;
    do {
      left += node.offsetLeft;
    } while ((node = node.offsetParent));
    return left;
  }


  // parses the URL querystring
  function queryStringParse(str) {

    var
      val = {},
      qs = (str || window.location.search.slice(1)).split('&'),
      q, v;

    // parse individual values
    for (q = 0; q < qs.length; q++) {
      v = qs[q].split('=');
      if (v.length == 2) {
        val[v[0]] = decodeURI(v[1]);
      }
    }

    return val;
  }
*/

  // create object from form data (set forQS true to create a querystring)
  function getFormData(form, forQS) {
    var arg = (forQS ? [] : {}), e, fe, val;
    for (e = 0; e < form.elements.length; e++) {
      fe = form.elements[e];
      if (fe.name && fe.value && !fe.disabled && fe.nodeName != 'BUTTON') {
        val = (fe.type == 'checkbox' || fe.type == 'radio' ? (fe.checked ? fe.value || 'on' : '') : fe.value);
        if (val) {
          if (forQS) arg.push(fe.name + '=' + encodeURIComponent(val));
          else arg[fe.name] = val;
        }
      }
    }
    return (forQS ? arg.join('&') : arg);
  }


/*
  // update form values
  function updateForm(form, obj) {

    var e, fe, nv;
    for (e = 0; e < form.elements.length; e++) {
      fe = form.elements[e];
      if (fe.name && fe.value && fe.nodeName != 'BUTTON') {
        switch (fe.type) {
          case 'checkbox':
            fe.checked = !!obj[fe.name];
            break;
          case 'radio':
            fe.checked = !!(obj[fe.name] && obj[fe.name] == fe.value);
            break;
          default:
            fe.value = nv = decodeURIComponent(obj[fe.name] || '');
            if (fe.tagName == 'SELECT' && (fe.selectedIndex < 0 || fe.value != nv)) {
              fe.selectedIndex = 0;
            }
        }
      }
    }

  }


  // event debouncing (delay passes without event reoccurring)
  function eventDebounce(element, event, callback, delay) {
    delay = delay || 300;
    var debounce;
    element.addEventListener(event, function(e) {
      if (debounce) clearInterval(debounce);
      debounce = setTimeout(function(){ callback(e); }, delay);
    }, false);
  }


  // event throttling (will call every delay period regardless of event occurances)
  function eventThrottle(element, event, callback, delay) {
    delay = delay || 300;
    var throttle, latest;
    element.addEventListener(event, function(e) {
      if (throttle) {
        // latest event
        latest = e;
      }
      else {
        // prevent new events and callback
        throttle = setTimeout(function(){
          throttle = null;
          if (latest) callback(latest);
        }, delay);
        callback(e);
      }
    }, false);
  }
*/

  // custom events
  if (CustomEvent && window.addEventListener && window.requestAnimationFrame && document.body.classList) {

    // throttled scroll/resize
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', scroller, false);
    scroller();

  }


  var pxBorder = 50, scTimer, scPos = 0, scClass, scAt;
  function scroller() {

    scTimer = scTimer || setTimeout(function() {

      // page scroll direction
      var
        wY = window.pageYOffset,
        dir = Math.sign(wY - scPos),
        at = (wY > pxBorder ? (wY > (document.body.clientHeight - window.innerHeight - pxBorder) ? 2 : 1) : 0);

      scPos = wY;

      // dispatch event
      scTimer = null;
      requestAnimationFrame(function() {

        if (scClass !== dir) {
          document.body.classList.remove('scroll' + scClass);
          scClass = dir;
          document.body.classList.add('scroll' + scClass);
        }

        if (scAt !== at) {
          document.body.classList.remove('at' + scAt);
          scAt = at;
          document.body.classList.add('at' + scAt);
        }

        window.dispatchEvent(new CustomEvent('scrollresize', { detail: { dir: dir }}));
      });
    }, 300);

  }


  // Ajax handler:
  // obj				- form node or URL string (required)
  // callback		- return function passed err, url, data (optional)
  // appendData	- external function to append data (optional)
  // progress		- progress function (optional)
  // timeout		- timeout in ms (optional, 10 second default)
  function ajax(obj, callback, appendData, progress, timeout) {

    // settings
    var
      req, ptime = +new Date(), complete = false, timeoutCheck,
      url = obj, retUrl = url,
      method = 'GET',
      nocache = +new Date(),
      data = null;

    callback = callback || function(){};
    timeout = timeout || 10000;

    if (typeof obj == 'string') {

      // string passed
      url += (url.lastIndexOf('?') < 0 ? '?' : '&') + 'ajax=' + nocache;

    }
    else {

      // form node passed
      url = retUrl = obj.action;
      method = (obj.method || 'GET').toUpperCase();

      // get argument data
      if (method == 'GET') {
        retUrl += '?' + getFormData(obj, true);
        url = retUrl + '&ajax=' + nocache;
      }
      else {
        if (obj.nodeType) data = new FormData(obj);
        else data = new FormData();
        if (appendData) data = appendData(data);
        data.append('ajax', nocache);
      }

    }

    // initialise call
    req = new XMLHttpRequest();
    req.open(method, url);
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // progress handler
    req.upload.onprogress = function(p) {
      ptime = +new Date();
      if (progress) progress(p);
    };

    // state change
    req.onreadystatechange = function() {

      if (req.readyState != 4) return;
      complete = true;
      var err = (req.status != 200), data = null;
      if (!err) {
        try {
          data = JSON.parse(req.response);
        }
        catch(e) {
          data = req.response || null;
        }
      }
      callback(err, retUrl, data);
    };

    // start
    req.send(data);

    // timeout
    timeoutCheck = function() {

      // request already ended?
      if (complete) return;

      // recheck later
      if ((+new Date() - ptime) < timeout) setTimeout(timeoutCheck, 10000);
      else {
        // abort request
        complete = true;
        req.abort();
        callback('TIMEOUT', retUrl, null);
      }

    };
    timeoutCheck();

  }


  // get page information
  function pageInfo() {

    var
      url = query('link[rel=canonical]'),
      desc = document.getElementsByName('description');

    return {
      url:    url ? url.href : location.href,
      title:  document.title || '',
      text:   desc.length ? desc[0].content : ''
    };

  }


  // replace {tokens} in a string
  function tokenReplace(str, token, urlencode) {

    for (let t in token) {
      var r = token[t];
      if (urlencode) r = encodeURIComponent(r);
      str = str.replace(new RegExp('\\$' + t + '\\$', 'g'), r);
    }

    return str;

  }


  // public methods
  return {
    each: each,
    //similar: similar,
    //pad: pad,
    //int: int,
    id: id,
    //tag: tag,
    className: className,
    query: query,
    queryAll: queryAll,
    closest: closest,
    //empty: empty,
    //setSelect: setSelect,
    //appliedStyle: appliedStyle,
    //posTop: posTop,
    //posLeft: posLeft,
    getFormData: getFormData,
    //updateForm: updateForm,
    //queryStringParse: queryStringParse,
    //eventDebounce: eventDebounce,
    //eventThrottle: eventThrottle,
    ajax: ajax,
    pageInfo: pageInfo,
    tokenReplace: tokenReplace
  };

})();
