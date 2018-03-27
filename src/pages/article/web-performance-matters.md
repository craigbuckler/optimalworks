---
title: Why web performance matters
description: Why the web became bloated and how we can fix it.
hero: v1517000950/works/speed.jpg
heroquote: striving for a better web
publish: 2018-01-27
tag: web, performance, seo
layout: article.ejs
---

No one intended for it to happen but the web has become a bloated mess. As of January 2018, [the average web page exceeds 3.5MB (source: httparchive.org)](http://httparchive.org/trends.php?s=All&minlabel=Jan+1+2018&maxlabel=Jan+15+2018). To put that into context, it's equivalent to the life-time works of William Shakespeare or two and a half floppy disks from the 1990s ([Id's Doom](https://en.wikipedia.org/wiki/Doom_%281993_video_game%29) was distributed on a single disk).

Despite this, web performance is more important than ever:

> slow sites will fall in search results
<cite>Google, January 2018</cite>

1. [More than half of users surf the web on mobile devices (source StatCounter)](http://gs.statcounter.com/platform-market-share/desktop-mobile-tablet). Not everyone has the latest smartphone and [the average time for a page to load is 22 seconds](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/).
1. Bandwidth remains limited and expensive. Accessing a single page costs the average UK mobile user £0.10. In Vanuatu, it's 2% of daily income. [(Source: whatdoesmysitecost.com)](https://whatdoesmysitecost.com/).
1. Google has announced [page speed will become a ranking factor](http://www.thesempost.com/google-mobile-first-index-page-speed-ranking/); slow sites will fall in search results.

I love online technologies and work on the web every day but, like many, I often find it a frustratingly slow and cumbersome user experience.


## It's probably not your server

> you have no control over the user's computing or bandwidth capabilities

It's tempting to blame slow pages on the server hardware, operating system, development language, or network capacity. Those factors have an influence but the best road in the world will not make an Austin Allegro (an awful 1970's UK car) drive like a Ferrari.

A slow site will remain slow because you have no control over the user's computing or bandwidth capabilities. Adding more server RAM or tweaking settings has a limited effect.


## How do web pages become bloated?
We all accumulate stuff. It's easy to obtain more desirable objects but throwing items away is considerably more difficult. *Are you sure you'll never need it?*

One of the biggest web bloat culprits is [WordPress](https://wordpress.com/). WordPress is a fabulous Content Management System which powers one third of the web. It's performance can be good, but the way it's used is rarely efficient...

1. The majority of businesses grab an attractive template. These are crammed full of features to appeal to the widest possible audience, yet sites use a small fraction of those facilities. Unnecessary code can remain in the page download.
1. The owner then adds further (mostly free) plug-ins. It's a simple one-click installation process but little attention is paid to the increasing performance cost.

Other websites and applications can evolve over many years by an ever-changing team of developers. It might be based on a framework which, in itself, can contain unused features. Further code is then added as more features are required. Eventually, those features are removed, hidden or modified but it's difficult to know when a chunk of code becomes obsolete. It could affect just one page in a huge site. Or perhaps removal could have unforeseen consequences on other, seemingly unrelated parts of the application.

There are tools to help code deletion but there's an easier option: *keep everything*. Page weight can spiral out of control.


## AMP is not the answer

> AMP weight still exceeds an equivalent well-optimised HTML5 page

Several companies have provided web performance *solutions*:

* Google has the [AMP project - Accelerated Mobile Pages](https://www.ampproject.org/)
* Facebook has [Instant Articles](https://instantarticles.fb.com/)

These systems require you to convert your existing content into a different 'site' on a new URL. You're recreating everything again using technologies and techniques dictated by those companies. No matter how *'open'* they claim to be, AMP and IA are closed alternatives to the open web. You are obligated to adhere with those organisation's whims and, even then, AMP/IA weight still exceeds an equivalent well-optimised HTML5 page.


## Performance is not a quick fix
> perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away
<cite>Antoine de Saint-Exupery, novelist</cite>

Unfortunately, there are no shortcuts. Like Search Engine Optimisation, performance is not a secret magical sauce sprinkled on a site to make it operate faster. There are [some quick wins](https://www.sitepoint.com/complete-guide-reducing-page-weight/?aref=cbuckler) such as enabling compression, optimising images, switching to HTTP/2 and using a CDN. However, dozens of (costly) changes may be required before performance improvements become noticeable.

Ideally, performance should be considered from the start. Developers used to do this in the early days of the web because dial-up connection speeds were woeful. Pages were considered excessive - *or even unusable* - if they exceeded 100Kb. Those days are over but the performance skills should never have been forgotten.

> Google will punish businesses with slow sites and applications

Developers and site owners could consider a performance budget, e.g. the total weight of any page will not exceed 500Kb. It becomes necessary to remove items or optimise further as you move toward that limit. Strive for simplicity; record user choices and perhaps remove a feature for every new one you add.

Google will punish businesses with slow sites and applications. Make sure yours isn't one of them - *[contact us today]([root]contact/)*.
