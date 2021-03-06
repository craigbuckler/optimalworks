---
title: Is PDF your best option?
description: Exporting PDF reports from browser-based systems may not be the simplest or most effective solution.
hero: v1536853566/works/papers
thumbheight: 6
herotype: <span>the benefits of HTML</span> <span>the benefits of PDF</span> <span>in one solution</span>
publish: 2018-09-13
tag: web
layout: article.ejs
---

Exporting a PDF report from a web-based application has several benefits:

1. Most browsers offer PDF export.
1. The document is read-only and can be distributed by email.
1. It can be viewed offline by anyone using a PDF reader.


Unfortunately, there are several downsides:

1. Controlling the PDF creation process using [CSS print styles](https://www.sitepoint.com/css-printer-friendly-pages/) is limited.
1. The resulting file size can be large.
1. PDF readers must be installed on some Operating Systems.
1. The layout is a fixed size and difficult to use on small-screen devices.
1. PDF accessibility and copy/paste can fail.


> why do we convert one perfectly good document format to another?

Ultimately, why we are converting a perfectly good document format to another? Web reports are already generated in HTML, so&hellip;

*Could we export a single HTML document?*

*Would it have all the benefits of PDF with none of the problems?*

That was the subject of my presentation at the [Future Sync conference in April 2019](https://futuresync.co.uk/) and the [TechExeter conference in September 2018](https://techexeter.uk/).

<div data-revealer="up" data-youtube="nF8j5Oxy_ho"></div>

## HTML proof of concept

My objective was to create a web-based report preview page which could download a static representation of itself as a single HTML file. It would look like a PDF document, have numbered pages/slides, would print well, be viewable offline, and could be distributed to anyone via email or other communication methods.

The resulting code can be found at [github.com/craigbuckler/html5-export](https://github.com/craigbuckler/html5-export) or you can **[view the demonstration](https://cdn.rawgit.com/craigbuckler/html5-export/ed653078/preview3.html)**.

The report content can be created on the server and/or client. All CSS and image assets are inlined using base64 encoding where necessary. The preview permits slides to be toggled and allows some basic editing (see the paragraph on page 8).

When the download icon link is clicked, a JavaScript event handler:

1. Extracts all code from the `<head>` and `<main>` elements using `.innerHTML`. All other page content is ignored.
1. Removes unnecessary slides, whitespace, comments, `<script>` tags, etc.
1. Adds the code to the `href` attribute of the download icon as a data URI.

> the downloaded HTML document works in any browser

The link sets the `download` attribute to force a file download. The downloaded HTML document can be opened in any browser - *even when offline* - and distributed as easily as a PDF.


## HTML export for your application

The code is a demonstration but you are free to use and adapt it for your own web-based reports. Alternatively, we can help you with implementation - [*please contact us to discuss your requirements&hellip;*]([root]contact/)
