# OptimalWorks website

The [OptimalWorks](https://www.optimalworks.net/) website - the business site for Craig Buckler.

This is static site constructed using Gulp, Metalsmith and custom plugins.


## Development

Build in development mode and watch for file changes:

```bash
gulp
```

or `gulp build` to just build development files.


## Production

Build files for production deployment:

```bash
gulp clean && NODE_ENV=production gulp build
```


## Deployment

Upload using FTP (not ideal but works on most hosts):

```bash
gulp deploy -u <ID> -p <PW>
```

## Browser testing

Test in Windows Chrome:

```bash
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --incognito --auto-open-devtools-for-tabs http://localhost:8000/
```


## Ping-o-matic

[Submit updates](https://pingomatic.com/ping/?title=OptimalWorks+Ltd&blogurl=https%3A%2F%2Fwww.optimalworks.net%2F&rssurl=https%3A%2F%2Fwww.optimalworks.net%2Ffeed.xml&chk_weblogscom=on&chk_blogs=on&chk_feedburner=on&chk_newsgator=on&chk_myyahoo=on&chk_pubsubcom=on&chk_blogdigger=on&chk_weblogalot=on&chk_newsisfree=on&chk_topicexchange=on&chk_google=on&chk_tailrank=on&chk_skygrid=on&chk_collecta=on&chk_superfeedr=on)
