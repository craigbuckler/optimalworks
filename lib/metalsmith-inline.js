/*
inline and image, script, or CSS with the data-inline attribute
*/
module.exports = (opt) => {

  'use strict';

  const { inlineSource } = require('inline-source');

  return async (files, metalsmith, done) => {

    await Promise.all(

      Object.keys(files)
        .filter(path => /[.](?:html?)$/.test(path))
        .map(async path => {
          let f = files[path];
          f.contents = Buffer.from(
            await inlineSource(f.contents.toString(), opt)
          ), 'utf8';
        })

    );

    done();
  };

};
