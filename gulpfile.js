var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', ['components']);

//script paths
var jsFiles = 'front-end/components/**/*.js';
var jsDest = 'front-end';

gulp.task('components', function () {
  return gulp.src(jsFiles)
    .pipe(concat('components.js'))
    .pipe(gulp.dest(jsDest));
});

// gulp.task('watch', function () {
//   gulp.watch('front-end/**/*.js', ['scripts']);
// });