/*
inline and image, script, or CSS with the data-inline attribute
derived from metalsmith-inline-source which fails in Node.js 12+ owing to an old inline-source module
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
