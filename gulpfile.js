var gulp = require("gulp"),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    eslint = require('gulp-eslint');

gulp.task("browserify", function () {
  var b = browserify({entries: "app/main.js"});

  return b.transform(reactify)
      .bundle()
      .on('error', function (err) {
        console.log(err.toString());
        this.emit("end");
      })
      .pipe(source("bundle.js"))
      .pipe(gulp.dest('public/js'));
});

gulp.task('lint', function () {
  gulp.src('app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .on('error', function(err) {
      console.log(err.toString())
    });
});

gulp.task('sass', function () {
  gulp.src('app/stylesheets/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(concat('main.css'))
      .pipe(gulp.dest('public/css'));
});

gulp.task('jsvender', function () {
  gulp.src([
      'bower_components/fetch/fetch.js'
    ]).pipe(concat('vendor.js'))
      .pipe(gulp.dest('public/js'));
});

gulp.task('cssvender', function () {
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
  gulp.watch('app/**/*.js', ['lint', 'browserify']);
  gulp.watch('app/stylesheets/**/*.scss', ['sass']);
});

gulp.task('default', ['browserify', 'sass', 'jsvender', 'cssvender']);
