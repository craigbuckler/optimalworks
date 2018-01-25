/*
metalsmith-tags
generate tag pages
*/
module.exports = (opt) => {

  'use strict';

  opt = opt || {};
  opt.maxitems = opt.maxitems || 50;
  opt.destination = opt.destination || 'tag/';
  opt.layout = opt.layout || 'tag.ejs';
  opt.description = opt.description || 'Pages which reference ';

  return (files, metalsmith, done) => {

    let
      meta = metalsmith.metadata(),
      tagList = meta.tag,
      root = meta.rootpath || '../'.repeat(opt.destination.split(/\\|\//g).length);

    // root tag location
    meta.tagroot = opt.destination;

    // loop tags
    for (let t = 0; t < tagList.length; t++) {

      let
        tag = tagList[t],
        idx = opt.destination + tag + '/index.html',
        set = [];

      // loop files
      for (let f in files) {

        let file = files[f];

        // tag found in page
        if (!file.private && file.tagL && file.tagL.includes(tag)) {
          set.push({
            title       : file.title,
            url         : file.url,
            thumb				: file.thumb,
            description : file.description,
            date			  : file.date,
            dateF			  : file.dateFormatted,
            priority    : file.priority
          });
        }

      }

      // sort by priority then date
      set.sort((a, b) => {
        if (a.priority !== b.priority) return b.priority - a.priority;
        else return b.date - a.date;
      });

      // create new page
      files[idx] = {
        url         : opt.destination + tag + '/',
        title       : tag,
        description : opt.description + tag,
        keywords    : tag,
        contents    : new Buffer('', 'utf8'),
        navlist     : [],
        root        : meta.rootpath,
        navrel      : { child: set },
        layout      : opt.layout,
        priority    : 0.1,
        private     : false
      };

    }

    done();

  };

};
