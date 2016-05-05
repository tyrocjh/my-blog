var gulp = require("gulp"),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

var dependencies = [
  'react',
  'react-dom',
  'react-router'
];

gulp.task('browserify', function() {
  browserify('app/main.js')
    .require(dependencies)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('build', ['browserify']);
