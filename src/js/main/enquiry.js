/*
  Enquiry form

  // requires: lib.js
*/
/* global ow gtag */

(function() {

  'use strict';

  // unsupported browser
  if (!ow.name || !FormData || !document.body.classList) return;

  // find all forms
  var form = ow.lib.queryAll('form.validator');
  for (var f = form.length - 1; f >= 0; f--) new Validator(
    form[f],
    {
      methodInit:   'init',
      methodSubmit: 'submit',
      activeClass:  'active',
      submitClass:  'submitting',
      successClass: 'success',
      errorClass:   'error',
      errorElement: '.error'
    }
  );

  // form validator
  function Validator(form, cfg) {

    this.cfg = cfg;
    this.form = form;
    this.error = ow.lib.query(cfg.errorElement);
    this.postback = {};
    this.submitting = false;

    // initialise
    ow.lib.ajax(
      this.form.action + this.cfg.methodInit + '/' + ow.name,
      function(err, url, data) {

        // invalid request?
        if (err || !data || typeof data !== 'object') return;

        // initialise form
        this.postback = data;

        this.form.action = this.form.action + this.cfg.methodSubmit + '/' + ow.name;
        this.form.addEventListener('submit', function(e) { this.submit(e); }.bind(this), false);
        this.form.classList.add(this.cfg.activeClass);

      }.bind(this)
    );

  }


  // form submission
  Validator.prototype.submit = function(e) {

    // stop default submission
    e.preventDefault();

    // start submit
    if (this.submitting) return;
    this.submitting = true;
    this.form.classList.remove(this.cfg.errorClass);
    this.form.classList.add(this.cfg.submitClass);
    this.error.textContent = '';

    // Ajax request
    ow.lib.ajax(this.form, complete.bind(this), append.bind(this));


    // FormData append
    function append(fd) {

      // postback
      for (var p in this.postback) {
        fd.append(p, this.postback[p]);
      }

      // required values
      var req = [];
      for (var f, i = this.form.elements.length - 1; i >= 0 && (f = this.form.elements[i]); i--) {
        if (f.name && f.required) req.push(f.name);
      }
      fd.append('required', req.join());

      return fd;
    }

    // Ajax completed
    function complete(err, url, data) {

      data = data || {};

      // submission complete
      this.submitting = false;
      this.error.textContent = '';
      this.form.classList.remove(this.cfg.submitClass);

      if (err || data.error) {

        // submission failed - show error
        this.error.textContent = data.error || 'Send failed: please try again shortly ' + (err === 'TIMEOUT' ? '[601]' : '[999]') + '.';
        this.form.classList.add(this.cfg.errorClass);

      }
      else {

        // submission successful
        this.form.classList.add(this.cfg.successClass);

        // analytics event
        if (typeof gtag !== 'undefined') gtag('event', 'contact', { 'method': 'form' });

      }

    }

  };

})();
