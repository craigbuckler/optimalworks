// Gulp.js configuration

(() => {
  'use strict';

  const

    // development or production
    devBuild  = ((process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development'),

    // show debug output
    debug         = false,

    pkg           = require('./package.json'),
    now           = new Date(),

    // source and build folders
    dir = {
      base        : __dirname + '/',
      lib         : __dirname + '/lib/',
      src         : 'src/',
      build       : 'build/',
      module      : 'node_modules/'
    },

    // site meta data
    site        = pkg.site,

    sitemeta = {
      devBuild    : devBuild,
      version     : pkg.version,
      versionFile : pkg.version.replace(/\./g, '-'),
      sitedesc    : site.description,
      author      : pkg.author,
      thisDomain  : devBuild ? site.devdomain : site.domain,
      rootpath    : devBuild ? site.devroot : site.root,
      layout      : 'page.ejs',
      now         : now,
      nowYear     : now.getUTCFullYear()
    },

    // Gulp and plugins
    gulp          = require('gulp'),
    noop          = require('gulp-noop'),
    newer         = require('gulp-newer'),
    imagemin      = require('gulp-imagemin'),
    sass          = require('gulp-sass'),
    sourcemaps    = devBuild ? require('gulp-sourcemaps') : null,
    postcss       = require('gulp-postcss'),
    preprocess    = require('gulp-preprocess'),
    deporder      = require('gulp-deporder'),
    concat        = require('gulp-concat'),
    terser        = require('gulp-terser'),

    // Metalsmith and plugins
    metalsmith    = require('metalsmith'),
    publish       = require('metalsmith-publish'),
    layouts		    = require('metalsmith-layouts'),
    markdown      = require('metalsmith-markdown'),
    inline        = require('metalsmith-inline-source'),
    wordcount		  = require('metalsmith-word-count'),
    beautify      = require('metalsmith-beautify'),
    minify        = require('metalsmith-html-minifier'),
    sitemap			  = require('metalsmith-mapsite'),

    // custom Metalsmith plugins
    msutil        = require(dir.lib + 'metalsmith-util'),
    addmeta       = require(dir.lib + 'metalsmith-addmeta'),
    tags          = require(dir.lib + 'metalsmith-tags'),
    rssfeed       = require(dir.lib + 'metalsmith-rssfeed'),

    // other modules
    del           = require('del'),
    util          = require(dir.lib + 'util');

  // copy package properties
  for (let p in site) {
    sitemeta[p] = site[p];
  }

  // full root URL
  sitemeta.rootURL = sitemeta.thisDomain + (sitemeta.rootpath || '');

  // CORS string
  let cors = '';
  for (let c in sitemeta.cors) {
    cors += `${c} 'self' ${sitemeta.cors[c]}`.trim() + '; ';
  }
  sitemeta.cors = cors.trim();

  // Browser-sync
  let browsersync	= false;

  // show build type
  console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');


  // clean build folder
  function clean() {

    return del([
      dir.build
    ],
    {
      force: true,
      // dryRun: true
    });

  }
  exports.clean = clean;


  // HTML settings
  const htmlCfg = {
    src         : dir.src + 'pages/',
    watch       : [dir.src + 'pages/**/*', dir.src + 'template/**/*'],
    build       : dir.build,

    markdown: {
      gfm: true,
      tables: true,
      smartypants: true,
      xhtml: true
    },

    metadata: {
      menuLowerCase: true
    },

    layouts: {
      directory : dir.src + 'template/',
      default   : sitemeta.layout
    },

    inline: {
      attribute: 'data-inline="1"',
      rootpath: dir.build
    },

    tidy: {
      indent_size : 2
    },

    sitemap: {
      hostname  : sitemeta.rootURL,
      omitIndex : true,
      changefreq: 'weekly',
      lastmod   : new Date()
    },

    rssfeed: {
      include: 'article'
    }
  };

  // build HTML pages
  function html(done) {

    metalsmith(dir.base)
      .source(htmlCfg.src)
      .destination(htmlCfg.build)
      .metadata(sitemeta)
      .clean(false)
      .use(publish())
      .use(msutil.rename)
      .use(markdown(htmlCfg.markdown))
      .use(addmeta(htmlCfg.metadata))
      .use(tags())
      .use(wordcount({ raw: true }))
      .use(layouts(htmlCfg.layouts))
      .use(msutil.shortcodes)
      .use(inline(htmlCfg.inline))
      .use(msutil.searchReplace)
      .use(devBuild ? beautify() : minify())
      .use(debug ? msutil.debug : msutil.noop)
      .use(devBuild ? ()=>{} : sitemap(htmlCfg.sitemap))
      .use(rssfeed(htmlCfg.rssfeed))
      .build((err) => {
        if (err) throw err;
      });

    if (browsersync) browsersync.reload();

    done();

  }
  exports.html = gulp.series(images, html);


  // root settings
  const
    rootCfg = {
      src         : [dir.src + 'root/process/*.*', dir.src + 'root/process/.*'],
      build       : dir.build
    };

  // root file processing
  function rootprocess() {

    return gulp.src(rootCfg.src)
      .pipe(newer(rootCfg.build))
      .pipe(preprocess({ extension: 'js', context: sitemeta }))
      .pipe(gulp.dest(rootCfg.build));

  }


  // root image settings
  const rootimagesCfg = {
    src         : dir.src + 'root/images/*.*',
    minOpts: {
      optimizationLevel: 5
    }
  };

  // root file processing
  function rootimages() {

    return gulp.src(rootimagesCfg.src)
      .pipe(newer(rootCfg.build))
      .pipe(gulp.dest(rootCfg.build));

  }


  // root file processing
  exports.root = gulp.parallel(rootprocess, rootimages);


  // image settings
  const imagesCfg = {
    src         : dir.src + 'images/**/*',
    build       : dir.build + 'images/',

    minOpts: {
      optimizationLevel: 5
    }
  };

  // image processing
  function images() {

    return gulp.src(imagesCfg.src)
      .pipe(newer(imagesCfg.build))
      .pipe(imagemin(imagesCfg.minOpts))
      .pipe(gulp.dest(imagesCfg.build));

  }
  exports.images = images;


  // CSS settings
  const cssCfg = {
    src         : dir.src + 'scss/main.scss',
    watch       : dir.src + 'scss/**/*',
    build       : dir.build + 'css/',
    filename    : `main-${sitemeta.versionFile}.css`,
    sassOpts: {
      outputStyle     : 'nested',
      imagePath       : '/images/',
      precision       : 3,
      errLogToConsole : true
    },
    processors: [
      require('postcss-import'),
      require('postcss-assets')({
        loadPaths: ['images/'],
        basePath: dir.build
      }),
      require('autoprefixer'),
      require('css-mqpacker'),
      require('cssnano')
    ]
  };

  // Sass/CSS processing
  function css() {

    del.sync(`${cssCfg.build}*`);

    return gulp.src(cssCfg.src)
      .pipe(sourcemaps ? sourcemaps.init() : noop())
      .pipe(sass(cssCfg.sassOpts).on('error', sass.logError))
      .pipe(preprocess({ extension: 'js', context: sitemeta }))
      .pipe(postcss(cssCfg.processors))
      .pipe(concat(cssCfg.filename))
      .pipe(sourcemaps ? sourcemaps.write() : noop())
      //.pipe(cssCfg.filename ? rename(cssCfg.filename) : noop())
      .pipe(gulp.dest(cssCfg.build))
      .pipe(browsersync ? browsersync.reload({ stream: true }) : noop());

  }
  exports.css = gulp.series(images, css);


  // JavaScript settings
  const jsCfg = {
      src         : dir.src + 'js/main/**/*',
      srcModule   : [
        dir.module + 'revealer.js/dist/revealer.js',
        dir.module + 'htmltypist.js/dist/typist.js'
      ],
      build       : dir.build + 'js/',
      filename    : `main-${sitemeta.versionFile}.js`
    },
    terserOpts = {
      mangle: {
        toplevel: true
      },
      compress: {
        drop_console: !devBuild
      },
      output: {
        quote_style :  1
      }
    };

  if (!devBuild) terserOpts.compress = { drop_console: true };

  // JavaScript processing
  function js() {

    del.sync(`${jsCfg.build}main-*.js`);

    return gulp.src([jsCfg.src].concat(jsCfg.srcModule))
      .pipe(preprocess({ context: sitemeta }))
      .pipe(sourcemaps ? sourcemaps.init() : noop())
      .pipe(deporder())
      .pipe(concat(jsCfg.filename))
      .pipe(terser(terserOpts))
      .on('error', (err) => { console.log(err.toString()); })
      .pipe(sourcemaps ? sourcemaps.write() : noop())
      .pipe(gulp.dest(jsCfg.build))
      .pipe(browsersync ? browsersync.reload({ stream: true }) : noop());

  }
  exports.js = js;


  // single JavaScript files (not concatenated)
  const jssingleCfg = {
    src         : dir.src + 'js/single/offlinepage.js',
    build       : dir.build + 'js/',
    filename    : `offlinepage-${sitemeta.versionFile}.js`
  };

  // JavaScript single file processing
  function jssingle() {

    del.sync(`${jsCfg.build}offlinepage-*.js`);

    return gulp.src(jssingleCfg.src)
      .pipe(preprocess({ context: sitemeta }))
      .pipe(concat(jssingleCfg.filename))
      .pipe(terser(terserOpts))
      .on('error', (err) => { console.log(err.toString()); })
      .pipe(gulp.dest(jssingleCfg.build));

  }
  exports.jssingle = jssingle;


  // root JavaScript PWA service worker
  const jspwaCfg = {
    src         : dir.src + 'js/pwa/**/*',
    build       : dir.build,
    filename    : 'sw.js'
  };

  // root JavaScript processing
  function jspwa() {

    return gulp.src(jspwaCfg.src)
      .pipe(preprocess({ context: sitemeta }))
      .pipe(deporder())
      .pipe(concat(jspwaCfg.filename))
      .pipe(terser(terserOpts))
      .on('error', (err) => { console.log(err.toString()); })
      .pipe(gulp.dest(jspwaCfg.build));

  }
  exports.jspwa = jspwa;


  // browser-sync options
  const syncOpts = {
    server: {
      baseDir   : dir.build,
      index     : 'index.html'
    },
    port        : 8000,
    files       : dir.build + '**/*',
    open        : false,
    notify      : false,
    ghostMode   : false,
    ui: {
      port: 8001
    }
  };

  // browser-sync
  function server(done) {

    if (browsersync === false) {
      browsersync	= devBuild ? require('browser-sync').create() : null;
    }
    if (browsersync) browsersync.init(syncOpts);

    done();

  }


  // watch for file changes
  function watch(done) {

    // page changes
    gulp.watch(htmlCfg.watch, html);

    // image changes
    gulp.watch(imagesCfg.src, images);

    // root changes
    gulp.watch(rootCfg.src, rootprocess);

    // root image changes
    gulp.watch(rootimagesCfg.src, rootimages);

    // CSS changes
    gulp.watch(cssCfg.watch, css);

    // JavaScript main changes
    gulp.watch(jsCfg.src, js);

    // JavaScript single file changes
    gulp.watch(jsCfg.src, jssingle);

    // JavaScript worker changes
    gulp.watch(jspwaCfg.src, jspwa);

    done();

  }
  exports.watch = gulp.series(watch, server);


  // run all tasks immediately
  exports.build = gulp.series(images, gulp.parallel(rootprocess, rootimages, html, css, js, jssingle, jspwa));


  // default task
  exports.default = gulp.series(exports.build, exports.watch);


  // deploy via FTP task - pass -u <id> -p <pw>
  function deploy() {

    let
      ftp = require('vinyl-ftp'),
      arg = util.parseArgs(process.argv),
      conn = ftp.create({
        host      : site.ftphost,
        user      : arg.user || arg.u,
        password  : arg.password || arg.p,
        parallel  : 1,
        log       : console.log
      }),
      glob = [
        dir.build + '**/*'
      ],
      src = {
        base      : dir.build,
        buffer    : false
      },
      remotePath = site.ftpdest + site.root;

    return gulp.src(glob, src)
      .pipe(conn.differentSize(remotePath))
      .pipe(conn.dest(remotePath));

  }
  exports.deploy = deploy;

})();
