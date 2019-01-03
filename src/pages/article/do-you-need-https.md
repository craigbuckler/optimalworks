---
title: Do you need HTTPS?
description: Is your website or application using secure transmission protocols? Should it?
hero: v1521642749/works/secure
heroquote: securing your systems
publish: 2018-03-21
tag: web, security, seo
layout: article.ejs
---

*A little technical background&hellip;*

Web pages are distributed using Hypertext Transfer Protocol (HTTP). It's the request-response transmission method developed by Sir Tim Berners-Lee in 1989 which forms the foundation of the World Wide Web. *(He also built the first web server, web browser and page editor while he was at it!)*

HTTP is not secure. When you browse a website and complete forms, either the request, the response, or both can be intercepted, read and modified by a third party. You may have experienced situations where advertisements have been injected into websites when using an open wifi network. This may not matter when reading an article but would be catastrophic if you were using an online shop or banking system. Your login credentials, personal details, and payment information would be available to anyone.

For this reason, HTTP Secure (HTTPS) was developed. It establishes encrypted communications between your browser and a web server which cannot be intercepted or modified.


## HTTPS everywhere
Until recently, HTTPS was primarily used by banks, ecommerce platforms, and sites collecting personal data. As of March 2018, 60% of the top 1 million sites use HTTPS - a rise of almost 40% in one year [(source: httparchive.org)](http://httparchive.org/trends.php#perHttps).

The primary reasons for the big HTTPS switch:

> we encourage all website owners to switch from HTTP to HTTPS to keep everyone safe on the web
<cite>Google</cite>

1. HTTPS makes the web safer and establishes trust.
1. Most browsers mark HTTP sites as "insecure" and warnings are becoming stronger.
1. [Google considers HTTPS as a ranking signal](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html). An HTTPS site will normally appear higher in search results than a similar HTTP site.

HTTPS has negligible performance penalties or downsides. It is also essential when implementing [Progressive Web Apps]([root]article/progressive-web-apps/).


## Is HTTPS for you?
HTTPS should be considered a priority if:

* your site or application requires a login or uses data collection forms, or
* your online presence is important to your business.

It's less urgent for those running smaller sites such as a personal article blog but should still be considered.


## How is HTTPS configured?
HTTPS is enabled by installing Secure Socket Layer (SSL) certificates on a web server. Certificates are issued by certificate authorities and remain valid for a specific period. Various types and prices are available ranging from free to extended validation options costing hundreds per year.


## So HTTPS can cost nothing?
Yes. Some hosts offer free SSL certificates and services such as [CloudFlare](https://www.cloudflare.com/) provide a Content Delivery Network (CDN) which proxies requests via an HTTPS-enabled server.

However, the SSL certificate itself will be a small part of your overall costs:

1. Configuring a server requires expertise and time.
1. Your site/application will need to be updated if you have internal links or third-party resources which use HTTP references.
1. Thorough testing is essential.


## HTTPS is just the start
HTTPS encrypts communications but that does not necessarily make a website or application secure. An application which issues the default password of "password" to every user is no more secure than it was before. HTTPS is an essential part of security but a small part of creating a secure application.

We've helped large international organisations secure their systems and all our client sites and applications implement top-level security practises. [*Contact us to discuss your requirements&hellip;*]([root]contact/)
