var gulp = require("gulp"),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  browserify('app/main.js')
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify', 'watch']);
gulp.task('build', ['browserify']);
