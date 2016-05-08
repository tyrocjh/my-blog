var gulp = require("gulp"),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

gulp.task('browserify', function() {
  browserify('app/main.js')
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('sass', function () {
  gulp.src('app/stylesheets/**/*.scss')
      .pipe(sass())
      .pipe(concat('main.css'))
      .pipe(gulp.dest('public/css'));
});

gulp.task('vender', function () {
  gulp.src([
  		'bower_components/bootstrap/dist/css/bootstrap.css'
  	]).pipe(concat('vendor.css'))
      .pipe(gulp.dest('public/css'));
});

gulp.task('clean', function() {
  gulp.src(['public/css', 'public/js'], {read: false})
  		.pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['browserify']);
  gulp.watch('app/stylesheets/**/*.scss', ['sass']);
});

gulp.task('default', ['browserify', 'sass', 'vender']);
