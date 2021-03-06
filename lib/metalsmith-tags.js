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
  opt.description = opt.description || 'Pages on the OptimalWorks website which reference the topic: ';

  return (files, metalsmith, done) => {

    let
      meta = metalsmith.metadata(),
      tagList = meta.tag.sort();

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
            thumbheight : file.thumbheight,
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
        contents    : Buffer.from('', 'utf8'),
        navlist     : [],
        root        : meta.rootpath,
        navrel      : { child: set },
        layout      : opt.layout,
        priority    : 0.1,
        private     : false
      };

    }

    // tag index page
    files[opt.destination + 'index.html'] = {
      url         : opt.destination,
      title       : 'Tags',
      description : `Keywords used on pages throughout ${meta.name}`,
      keywords    : 'tag, keyword, search, term',
      contents    : Buffer.from('', 'utf8'),
      navlist     : [],
      tag         : tagList,
      tagL        : tagList,
      root        : meta.rootpath,
      navrel      : false,
      layout      : opt.layout,
      priority    : 0.1,
      private     : false
    };

    done();

  };

};
