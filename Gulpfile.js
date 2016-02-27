/*
 * Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/* ----------------------------------------------------------------------------
 * Imports
 * ------------------------------------------------------------------------- */

var gulp       = require('gulp');
var addsrc     = require('gulp-add-src');
var args       = require('yargs').argv;
var autoprefix = require('autoprefixer');
var child      = require('child_process');
var clean      = require('del');
var collect    = require('gulp-rev-collector');
var compact    = require('gulp-remove-empty-lines');
var concat     = require('gulp-concat');
var ignore     = require('gulp-ignore');
var gulpif     = require('gulp-if');
var mincss     = require('gulp-cssnano');
var minhtml    = require('gulp-htmlmin');
var minimage   = require('gulp-image-optimization');
var modernizr  = require('gulp-modernizr');
var mqpacker   = require('css-mqpacker');
var notifier   = require('node-notifier');
var plumber    = require('gulp-plumber');
var postcss    = require('gulp-postcss');
var rev        = require('gulp-rev');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');
var util       = require('gulp-util');
var vinyl      = require('vinyl-paths');

/* ----------------------------------------------------------------------------
 * Locals
 * ------------------------------------------------------------------------- */

/* MkDocs server */
var server = null;

/* ----------------------------------------------------------------------------
 * Overrides
 * ------------------------------------------------------------------------- */

/*
 * Override gulp.src() for nicer error handling.
 */
var src = gulp.src;
gulp.src = function() {
  return src.apply(gulp, arguments)
    .pipe(
      plumber(function(error) {
        util.log(util.colors.red(
          'Error (' + error.plugin + '): ' + error.message
        ));
        notifier.notify({
          title: 'Error (' + error.plugin + ')',
          message: error.message.split('\n')[0]
        });
        this.emit('end');
      }));
};

/* ----------------------------------------------------------------------------
 * Asset pipeline
 * ------------------------------------------------------------------------- */

/*
 * Build stylesheets from SASS source.
 */
gulp.task('assets:stylesheets', function() {
  return gulp.src('src/assets/stylesheets/*.scss')
    .pipe(gulpif(args.sourcemaps, sourcemaps.init()))
    .pipe(
      sass({
        includePaths: [
          'bower_components/bourbon/app/assets/stylesheets/',
          'bower_components/quantum-colors/',
          'bower_components/quantum-shadows/'
        ]
      }))
    .pipe(
      postcss([
        autoprefix(),
        mqpacker
      ]))
    .pipe(gulpif(args.sourcemaps, sourcemaps.write()))
    .pipe(gulpif(args.production, mincss()))
    .pipe(gulp.dest('material/assets/stylesheets/'));
});

/*
 * Build javascripts from Bower components and source.
 */
gulp.task('assets:javascripts', function() {
  return gulp.src([

    /* Bower components */
    'bower_components/classlist/classList.js',
    'bower_components/fastclick/lib/fastclick.js',
    'bower_components/pegasus/dist/pegasus.js',
    'bower_components/lunr.js/lunr.js',

    /* Application javascripts */
    'src/assets/javascripts/application.js',
    'src/assets/javascripts/standalone.js'
  ]).pipe(gulpif(args.sourcemaps, sourcemaps.init()))
    .pipe(concat('application.js'))
    .pipe(gulpif(args.sourcemaps, sourcemaps.write()))
    .pipe(gulpif(args.production, uglify()))
    .pipe(gulp.dest('material/assets/javascripts/'));
});

/*
 * Create a customized modernizr build.
 */
gulp.task('assets:modernizr', [
  'assets:stylesheets',
  'assets:javascripts'
], function() {
  return gulp.src([
    'material/assets/stylesheets/application.css',
    'material/assets/javascripts/application.js'
  ]).pipe(
      modernizr({
        options: [
          'addTest',                   /* Add custom tests */
          'fnBind',                    /* Use function.bind */
          'html5printshiv',            /* HTML5 support for IE */
          'setClasses',                /* Add CSS classes to root tag */
          'testProp'                   /* Test for properties */
        ]
      }))
    .pipe(addsrc.append('bower_components/respond/dest/respond.src.js'))
    .pipe(concat('modernizr.js'))
    .pipe(gulpif(args.production, uglify()))
    .pipe(gulp.dest('material/assets/javascripts'));
});

/*
 * Copy static assets like images and webfonts.
 */
gulp.task('assets:static', function() {
  return gulp.src('src/assets/{fonts,images}/*.{jpg,png,gif}')
    .pipe(gulpif(args.production,
      minimage({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      })))
    .pipe(addsrc.append('src/assets/{fonts,images}/*.{ico,eot,svg,ttf,woff}'))
    .pipe(gulp.dest('material/assets/'));
});

/*
 * Minify views.
 */
gulp.task('assets:views', args.production ? [
  'assets:modernizr',
  'assets:revisions:clean',
  'assets:revisions'
] : [], function() {
  return gulp.src([
    'src/*.html'
  ]).pipe(
      minhtml({
        collapseBooleanAttributes: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }))
    .pipe(compact())
    .pipe(gulpif(args.production,
      addsrc.append([
        'material/manifest.json',
        'material/**/*.css'
      ])))
    .pipe(gulpif(args.production, collect()))
    .pipe(ignore.exclude(/manifest\.json$/))
    .pipe(gulp.dest('material'));
});

/*
 * Clean outdated revisions.
 */
gulp.task('assets:revisions:clean', function() {
  return gulp.src(['material/**/*.{ico,css,js,png,jpg,gif}'])
    .pipe(ignore.include(/-[a-f0-9]{8,}\.(ico|css|js|png|jpg|gif)$/))
    .pipe(vinyl(clean));
});

/*
 * Revision assets after build.
 */
gulp.task('assets:revisions', [
  'assets:revisions:clean',
  'assets:stylesheets',
  'assets:javascripts',
  'assets:static'
], function() {
  return gulp.src(['material/**/*.{ico,css,js,png,jpg,gif}'])
    .pipe(ignore.exclude(/-[a-f0-9]{8,}\.(css|js|png|jpg|gif)$/))
    .pipe(rev())
    .pipe(gulp.dest('material'))
    .pipe(rev.manifest('manifest.json'))
    .pipe(gulp.dest('material'));
});

/*
 * Build assets.
 */
gulp.task('assets:build', [
  'assets:stylesheets',
  'assets:javascripts',
  'assets:modernizr',
  'assets:static',
  'assets:views'
]);

/*
 * Watch assets for changes and rebuild on the fly.
 */
gulp.task('assets:watch', function() {

  /* Rebuild stylesheets */
  gulp.watch([
    'src/assets/stylesheets/**/*.scss'
  ], ['assets:stylesheets']);

  /* Rebuild javascripts */
  gulp.watch([
    'src/assets/javascripts/**/*.js',
    'bower.json'
  ], ['assets:javascripts']);

  /* Copy static assets */
  gulp.watch([
    'src/assets/{fonts,images}/*'
  ], ['assets:static']);

  /* Minify views */
  gulp.watch([
    'src/*.html'
  ], ['assets:views']);
});

/* ----------------------------------------------------------------------------
 * Application server
 * ------------------------------------------------------------------------- */

/*
 * Build documentation.
 */
gulp.task('mkdocs:build', [
  'assets:build'
], function() {
  return child.spawnSync('mkdocs', ['build']);
});

/*
 * Restart MkDocs server.
 */
gulp.task('mkdocs:serve', function() {
  if (server)
    server.kill();

  /* Spawn MkDocs server */
  server = child.spawn('mkdocs', ['serve', '-a', '0.0.0.0:8000']);

  /* Pretty print server log output */
  server.stdout.on('data', function(data) {
    var lines = data.toString().split('\n')
    for (var l in lines)
      if (lines[l].length)
        util.log(lines[l]);
  });

  /* Print errors to stdout */
  server.stderr.on('data', function(data) {
    process.stdout.write(data.toString());
  });
});

/* ----------------------------------------------------------------------------
 * Interface
 * ------------------------------------------------------------------------- */

/*
 * Build assets and documentation.
 */
gulp.task('build', [
  'assets:build'
].concat(args.mkdocs
  ? 'mkdocs:build'
  : []));

/*
 * Start asset and MkDocs watchdogs.
 */
gulp.task('watch', [
  'assets:build',
], function() {
  return gulp.start([
    'assets:watch'
  ].concat(args.mkdocs
    ? 'mkdocs:serve'
    : []));
});

/*
 * Build assets by default.
 */
gulp.task('default', ['build']);