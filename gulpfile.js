var gulp = require('gulp');
var eslint = require('gulp-eslint');
var del = require('del');

gulp.task('clean', function () {
  return del(['tmp', 'dist']);
});

gulp.task('lint', ['clean'], function () {
  var sources = [
    'src/**/*.js',
    'test/**/*.js'
  ];

  return gulp.src(sources)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint']);

gulp.task('scripts', ['test'], function () {
  return gulp.src('src/**/*.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('build', [
  'scripts'
]);
