module.exports = function (gulp, options, $) {
  return gulp.task('s3', function () {
    gulp.src(options.paths.img + '**')
        .pipe($.s3(options.s3, {uploadPath: 'email/' + options.directory + '/'}));
  });
};

