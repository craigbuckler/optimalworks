---
title: Why web performance matters
description: Why the web became bloated and how we can fix it.
hero: v1515501268/works/money-bank.jpg
heroquote: fixing the web one page at a time
publish: 2018-01-26
tag: web, performance
layout: article.ejs
---

No one intended for it to happen but the web has become a bloated mess. As of January 2018, [the average web page exceeds 3.5MB (source: httparchive.org)](http://httparchive.org/trends.php?s=All&minlabel=Jan+1+2018&maxlabel=Jan+15+2018). To put that into context, it's equivalent to the life-time works of William Shakespeare or two and a half floppy disks from the 1990s.

Despite this, web performance is more important than ever:

> average page load time is 22 seconds on mobile
<cite>Google research, 2017</cite>

1. [More than half of users surf the web on mobile devices (source StatCounter)](http://gs.statcounter.com/platform-market-share/desktop-mobile-tablet). Not everyone has the latest smartphone and [the average time for a page to load is 22 seconds](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/).
1. Bandwidth remains limited and expensive. Accessing a single page costs the average UK mobile user £0.10. In Vanuatu, it's 2% of daily income. [(Source: whatdoesmysitecost.com)](https://whatdoesmysitecost.com/).
1. Google has announced [page speed will become a ranking factor](http://www.thesempost.com/google-mobile-first-index-page-speed-ranking/); *slow sites will fall in search results*.

I love web technologies and work on them every day but, like many, I often find it an annoying, slow user experience.


## It's probably not your server
If your pages are slow it's tempting to blame the server hardware, operating system, or network capacity. Those factors have an influence but the best road in the world will not make an Austin Allegro (awful 70's UK car) drive like a Ferrari. A slow site will remain slow because you have no control over the user's computing or bandwidth capabilities.


## How did pages become so bloated?
Humans like to accumulate stuff. It's easy to obtain more desirable objects. Throwing obsolete items away is more difficult: *are you sure you'll never need it?*

One of the biggest culprits is [WordPress](https://wordpress.com/). WordPress is a fabulous Content Management System which powers one third of the web. WordPress performance can be good, but the way it's used is rarely efficient...

1. The majority of businesses grab an attractive, perhaps free, template. These are crammed full of features to appeal to the widest possible audience, but few sites use more than a small fraction. Unnecessary code is already been added to the download.

A website or application can evolve over many years by an ever-changing team of developers. They might start with a framework then add further code as more features are required. Eventually, features are removed, hidden or modified but it's difficult to know whether a chunk of code can be removed. After all, it could affect just one page in a huge site. Or perhaps removal could have unforeseen consequences on other, seemingly unrelated parts of an application.

There are tools to help code removal but there's a far easier option: *keep everything*.




## AMP is not the answer
Several companies have provided slow web *solutions*:

* Google has the [AMP project - Accelerated Mobile Pages](https://www.ampproject.org/)
* Facebook has [Instant Articles](https://instantarticles.fb.com/)

These systems require you to provide your existing content in a different way on a new URL. You're recreating everything again using technologies and techniques dictated by those companies. No matter how 'open' they claim to be, AMP and IA are closed alternatives to the open web. Even then, AMP/IA pages can still exceed several MB.


> perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away
<cite>Antoine de Saint-Exupery, novelist</cite>

consider performance from the start
