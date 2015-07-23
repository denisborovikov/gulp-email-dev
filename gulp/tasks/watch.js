var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var runSequence = require('run-sequence');

module.exports = function(gulp, options, $) {
    gulp.task('watch', function() {
        if (options.browserSync) browserSync(options.browserSync);

        gulp.watch(options.files.scss, function() {
            runSequence('default', 'html');
        });

        gulp.watch(options.files.img, ['images']);
        gulp.watch(options.files.html, ['html']);
    });
};