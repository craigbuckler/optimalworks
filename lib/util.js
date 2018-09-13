// utility functions
module.exports = (function() {

  'use strict';

  // parse an array into named arguments
  function parseArgs(arglist) {

    var arg = {}, a, tArg, param, cArg;
    for (a = 0; a < arglist.length; a++) {

      tArg = arglist[a].trim();
      param = tArg.replace(/^-+/, '');

      if (param === tArg) {

        // set argument value
        if (cArg) arg[cArg] = param;
        cArg = null;

      }
      else {

        // set argument
        cArg = param;
        arg[cArg] = true;

      }

    }

    return arg;

  }

  return {
    parseArgs: parseArgs
  };

})();
