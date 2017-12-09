var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task("default", ["scripts"]);

//script paths
var jsFiles = 'front-end/src/js/**/*.js';
var jsDest = 'front-end/dist/js';

gulp.task('scripts', function () {
  return gulp.src(jsFiles)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});