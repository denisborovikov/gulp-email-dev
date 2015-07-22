var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gulpCallback = require('../utils/utils').gulpCallback;

module.exports = function (gulp, options, $) {
    gulp.task('html', function () {
        return gulp.src(options.files.html)
            .pipe($.plumber())
            .pipe($.swig())
            .pipe($.emailBuilder({juice: {preserveMediaQueries: true}}))
            .pipe(gulpCallback(StringBatchReplace))
            .pipe($.htmlI18n({
              langDir       : './lang'
            }))
            .pipe(gulp.dest('./dest'))
            .pipe(reload({stream: true}));
    });

    // Replace strings from `options.replace`
    function StringBatchReplace(file) {
        var arr = options.replace;

        for (var i = 0, max = arr.length; i < max; i++) {
            var search = arr[i][0],
              replace = arr[i][1];

            file.contents = search instanceof RegExp
              ? new Buffer(String(file.contents).replace(search, replace))
              : new Buffer(String(file.contents).split(search).join(replace));
        }
    }
};
