const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const header = require('gulp-header');
const qunit = require('gulp-qunit');

const pkg = require('./package.json');
const banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @license <%= pkg.license %>',
  ' */',
  '',
].join('\n');

gulp.task('js', () => {
  gulp
    .src('./src/*.js')
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest('./dist'))
    .pipe(concat('jquery.cbslideheader.min.js'))
    .pipe(uglify())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', () => {
  gulp
    .src('./src/*.css')
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', () => {
  gulp.src('./test/index.html').pipe(qunit());
});

gulp.task('default', ['js', 'css']);
