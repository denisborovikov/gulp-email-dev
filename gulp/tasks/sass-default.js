// Task to compile and process SCSS files.
// Run `gulp` to run the task for all non partial SCSS.
// Run `gulp --only=SCSS` to run task for specific SCSS file,
// i.e. `gulp --only=import.scss`.

var fs = require('fs');
var path = require('path');
var browserSync = require('browser-sync');
var paramCase = require('param-case');
var reload = browserSync.reload;
var gulpCallback = require('../utils/utils').gulpCallback;

// PostCSS processors
var mqpacker = require('css-mqpacker');

module.exports = function (gulp, options, $) {
  gulp.task('default', function (callback) {
    return gulp.src(options.files.scss)
      .pipe($.plumber())
      .pipe($.sassBulkImport())
      .pipe($.sass({precision: 10}))
      .pipe($.postcss([
        mqpacker,
        mqextractor,
      ]))
      .pipe($.splitLocales())
      .pipe($.if(options.rtlize, $.cssFlipper()))
      .pipe(gulp.dest(options.paths.css))
      .pipe(gulpCallback(RTLize))
      .pipe(reload({stream: true}));
  });

  // Make RTL copy of main file
  function RTLize(file) {
    var name = path.basename(file.path, '.css');

    if (!~options.rtlcopy.indexOf(name + '.scss'))  return;

    gulp.src(path.join(options.paths.css + name, name + '.css'))
      .pipe($.rename(name + '-rtl.css'))
      .pipe($.cssFlipper())
      .pipe(gulp.dest(options.paths.css + name + path.sep))
      .pipe(reload({stream: true}));
  }

  // PostCSS plugin to extract media queries to files
  function mqextractor(css) {
    var queries = {};
    var queryLists = [];

    css.eachAtRule('media', function (atRule) {
      var queryList = atRule.params;
      var filename;

      // Ignore retina and print media queries
      if (~queryList.indexOf('print') || ~queryList.indexOf('min-resolution') || ~queryList.indexOf('device-pixel-ratio')) {
        return;
      }

      queries[queryList] = atRule.clone();
      queryLists.push(queryList);

      atRule.removeSelf();

      filename = paramCase(queryList);

      fs.writeFile(path.join(options.paths.css, filename + '.css'), queries[queryList], function (err) {
        if (err) {
          throw err
        }
      });
    });

    return css;
  }

};


