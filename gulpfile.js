// Gulp.js configuration

(() => {
  'use strict';

  // development or production
  var devBuild  = ((process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development');

  const

  // show debug output
    debug         = false,

    pkg           = require('./package.json'),
    now           = new Date(),

    // source and build folders
    dir = {
      base        : __dirname + '/',
      lib         : __dirname + '/lib/',
      src         : 'src/',
      build       : 'build/'
    },

    // site meta data
    site        = pkg.site,

    sitemeta = {
      devBuild    : devBuild,
      version     : pkg.version,
      sitedesc    : site.description,
      author      : pkg.author,
      thisDomain  : devBuild ? site.devdomain : site.domain,
      rootpath    : devBuild ? site.devroot : site.root,
      layout      : 'page.html',
      now         : now,
      nowYear     : now.getUTCFullYear()
    },

    // Gulp and plugins
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    newer         = require('gulp-newer'),
    imagemin      = require('gulp-imagemin'),
    sass          = require('gulp-sass'),
    postcss       = require('gulp-postcss'),
    preprocess    = require('gulp-preprocess'),
    deporder      = require('gulp-deporder'),
    concat        = require('gulp-concat'),
    stripdebug    = require('gulp-strip-debug'),
    uglify        = require('gulp-uglify'),
    lightmin      = require('gulp-lightmin'),
    trimlines     = require('gulp-trimlines'),

    // Metalsmith and plugins
    metalsmith    = require('metalsmith'),
    publish       = require('metalsmith-publish'),
    layouts		    = require('metalsmith-layouts'),
    markdown      = require('metalsmith-markdown'),
    headingid     = require('metalsmith-headings-identifier'),
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

  // Browser-sync
  var browsersync	= false;

  // show build type
  console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');


  // clean build folder
  gulp.task('clean', (done) => {
    del([
      dir.build,
    ],
    {
      force: true,
    // dryRun: true
    })
      .then(paths => { console.log('deleted:\n', paths.join('\n')); });
    done();
  });


  // HTML settings
  const html = {
    src         : dir.src + 'pages/',
    watch       : [dir.src + 'pages/**/*', dir.src + 'template/**/*'],
    build       : dir.build,

    metadata: {
      menuLowerCase: true
    },

    headingid: {
      linkTemplate: '<a href="#%s" alt="title" class="heading"></a>'
    },

    layouts: {
      engine    : 'ejs',
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
  gulp.task('html', ['images'], (done) => {

    metalsmith(dir.base)
      .source(html.src)
      .destination(html.build)
      .metadata(sitemeta)
      .clean(false)
      .use(publish())
      .use(msutil.rename)
      .use(markdown())
      .use(addmeta(html.metadata))
      .use(tags())
      .use(headingid(html.headingid))
      .use(wordcount({ raw: true }))
      .use(layouts(html.layouts))
      .use(msutil.shortcodes)
      .use(inline(html.inline))
      .use(devBuild ? beautify() : minify())
      .use(debug ? msutil.debug : msutil.noop)
      .use(sitemap(html.sitemap))
      .use(rssfeed(html.rssfeed))
      .build((err) => {
        if (err) throw err;
      });

    done();

  });


  // root settings
  const
    root = {
      build       : dir.build
    },
    rootprocess = {
      src         : [dir.src + 'root/process/*.*', dir.src + 'root/process/.*']
    };

  // root file processing
  gulp.task('rootprocess', () => {
    return gulp.src(rootprocess.src)
      .pipe(newer(root.build))
      .pipe(preprocess({ extension: 'js', context: sitemeta }))
      .pipe(gulp.dest(root.build));
  });


  // root image settings
  const rootimages = {
    src         : dir.src + 'root/images/*.*',
    minOpts: {
      optimizationLevel: 5
    }
  };

  // root file processing
  gulp.task('rootimages', () => {
    return gulp.src(rootimages.src)
      .pipe(newer(root.build))
      .pipe(gulp.dest(root.build));
  });


  // root file processing
  gulp.task('root', ['rootprocess', 'rootimages']);


  // image settings
  const images = {
    src         : dir.src + 'images/**/*',
    build       : dir.build + 'images/',

    minOpts: {
      optimizationLevel: 5
    }
  };

  // image processing
  gulp.task('images', () => {
    return gulp.src(images.src)
      .pipe(newer(images.build))
      .pipe(imagemin(images.minOpts))
      .pipe(gulp.dest(images.build));
  });


  // CSS settings
  var css = {
    src         : dir.src + 'scss/main.scss',
    watch       : dir.src + 'scss/**/*',
    build       : dir.build + 'css/',
    sassOpts: {
      outputStyle     : 'nested',
      imagePath       : '/images/',
      precision       : 3,
      errLogToConsole : true
    },
    processors: [
      require('postcss-assets')({
        loadPaths: ['images/'],
        basePath: dir.build
      }),
      require('autoprefixer')({
        browsers: ['> 2%']
      }),
      require('css-mqpacker')
    ]
  };

  // production CSS
  if (!devBuild) {
    css.processors.push(require('cssnano'));
  }

  // Sass/CSS processing
  gulp.task('css', ['images'], () => {
    return gulp.src(css.src)
      .pipe(sass(css.sassOpts))
      .pipe(preprocess({ extension: 'js', context: sitemeta }))
      .pipe(postcss(css.processors))
      .pipe(gulp.dest(css.build))
      .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());
  });


  // JavaScript settings
  const js = {
    src         : dir.src + 'js/main/**/*',
    build       : dir.build + 'js/',
    filename    : 'main.js'
  };

  // JavaScript processing
  gulp.task('js', () => {

    return gulp.src(js.src)
      .pipe(preprocess({ context: sitemeta }))
      .pipe(deporder())
      .pipe(concat(js.filename))
      .pipe(devBuild ? gutil.noop() : stripdebug())
      .pipe(devBuild ? gutil.noop() : uglify())
      .on('error', (err) => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
      .pipe(gulp.dest(js.build))
      .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop());

  });


  // single JavaScript files (not concatenated)
  const jssingle = {
    src         : dir.src + 'js/single/*.js',
    build       : dir.build + 'js/'
  };

  // JavaScript single file processing
  gulp.task('jssingle', () => {

    return gulp.src(jssingle.src)
      .pipe(preprocess({ context: sitemeta }))
      .pipe(devBuild ? gutil.noop() : stripdebug())
      .pipe(devBuild ? gutil.noop() : lightmin())
      .pipe(devBuild ? gutil.noop() : trimlines())
      .on('error', (err) => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
      .pipe(gulp.dest(jssingle.build));

  });


  // root JavaScript PWA service worker
  const jspwa = {
    src         : dir.src + 'js/pwa/**/*',
    build       : dir.build,
    filename    : 'sw.js'
  };

  // root JavaScript processing
  gulp.task('jspwa', () => {

    return gulp.src(jspwa.src)
      .pipe(preprocess({ context: sitemeta }))
      .pipe(deporder())
      .pipe(concat(jspwa.filename))
      .pipe(devBuild ? gutil.noop() : stripdebug())
      .pipe(devBuild ? gutil.noop() : lightmin())
      .pipe(devBuild ? gutil.noop() : trimlines())
      .on('error', (err) => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
      .pipe(gulp.dest(jspwa.build));

  });



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
  gulp.task('browsersync', () => {
    if (browsersync === false) {
      browsersync	= devBuild ? require('browser-sync').create() : null;
    }
    if (browsersync) browsersync.init(syncOpts);
  });


  // watch for file changes
  gulp.task('watch', ['browsersync'], () => {

    // page changes
    gulp.watch(html.watch, ['html'], browsersync ? browsersync.reload : {});

    // image changes
    gulp.watch(images.src, ['images']);

    // root changes
    gulp.watch(root.src, ['root']);

    // CSS changes
    gulp.watch(css.watch, ['css']);

    // JavaScript main changes
    gulp.watch(js.src, ['js']);

    // JavaScript single file changes
    gulp.watch(js.src, ['jssingle']);

    // JavaScript worker changes
    gulp.watch(jspwa.src, ['jspwa']);

  });


  // run all tasks immediately
  gulp.task('build', ['root', 'html', 'css', 'js', 'jssingle', 'jspwa']);


  // default task
  gulp.task('default', ['build', 'watch']);


  // deploy via FTP task - pass -u <id> -p <pw>
  gulp.task('deploy', () => {

    let
      ftp = require('vinyl-ftp'),
      arg = util.parseArgs(process.argv),
      conn = ftp.create({
        host      : site.ftphost,
        user      : arg.user || arg.u,
        password  : arg.password || arg.p,
        parallel  : 1,
        log       : gutil.log
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

  });

})();
