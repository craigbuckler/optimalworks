/*
metalsmith-rssfeed
generate an rss.xml file
*/
module.exports = (opt) => {

  'use strict';

  opt = opt || {};
  opt.include = opt.include || 'article';
  opt.maxitems = opt.maxitems || 10;
  opt.destination = opt.destination || 'feed.xml';
  opt.generator = opt.generator || '';

  let
    findMain = /<main[^>]*>([\s|\S]*)<\/main>/i,
    findBody = /<body[^>]*>([\s|\S]*)<\/body>/i;

  return (files, metalsmith, done) => {

    let
      meta = metalsmith.metadata(),
      now = new Date(),
      feed = '',
      cs = '<![CDATA[', ce = ']]>',
      page = null, p = 0;

    // find root page
    while (!page && p < meta.nav.length) {
      if (meta.nav[p].item === opt.include) page = meta.nav[p];
      else p++;
    }

    if (page && page.child && page.child.length) {

      // add child items
      for (let c = 0; c < page.child.length && c <= opt.maxitems; c++) {

        let
          cp = page.child[c],
          content = files[cp.index].contents.toString(),
          extract = content.match(findMain) || content.match(findBody);

        if (!cp.private) {

          content = (extract && extract.length === 2 ? extract[1].trim().replace(/\t/g, '') : '');

          feed +=
						'<item>\n' +
						`<title>${cp.title}</title>\n` +
						'<link>' + meta.rootURL + cp.url + '</link>\n' +
						'<guid isPermaLink="true">' + meta.rootURL + cp.url + '</guid>\n' +
						'<pubDate>' + cp.date.toUTCString() + '</pubDate>\n' +
						`<dc:creator>${cs}${meta.author}${ce}</dc:creator>\n` +
						`<category>${(cp.tag && cp.tag[0]) || opt.include}</category>\n` +
						(cp.description ? `<description>${cs}${cp.description}${ce}</description>\n` : '') +
						(content ? `<content:encoded>${cs}${content}${ce}</content:encoded>\n` : '') +
						'</item>\n';

        }
      }

      // add RSS header and footer
      if (feed) {
        feed =
					'<?xml version="1.0" encoding="UTF-8"?>\n' +
					'<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">\n' +
					'<channel>\n' +
					`<title>${meta.name}</title>\n` +
					`<link>${meta.rootURL}</link>\n` +
					'<atom:link href="' + meta.rootURL + opt.destination + '" rel="self" type="application/rss+xml" />\n' +
					(meta.description ? `<description>${meta.description}</description>\n` : '') +
					'<lastBuildDate>' + now.toUTCString() + '</lastBuildDate>\n' +
					'<language>' + (meta.language || 'en') + '</language>\n' +
					'<sy:updatePeriod>daily</sy:updatePeriod>\n' +
					'<sy:updateFrequency>1</sy:updateFrequency>\n' +
					feed +
					'</channel>\n' +
					'</rss>\n';
      }

      // output RSS file
      files[opt.destination] = {
        contents: new Buffer(feed, 'utf8')
      };

    }

    done();

  };

};
