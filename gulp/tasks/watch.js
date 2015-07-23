var browserSync = require('browser-sync');
var reload      = browserSync.reload;

module.exports = function(gulp, options, $) {
    gulp.task('watch', function() {
        if (options.browserSync) browserSync(options.browserSync);

        gulp.watch(options.files.scss, ['default', 'html']);
        gulp.watch(options.files.img, ['images']);
        gulp.watch(options.files.html, ['html']);
    });
};