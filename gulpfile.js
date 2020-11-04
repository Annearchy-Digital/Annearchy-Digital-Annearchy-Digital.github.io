var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/blk-design-system.scss',
  SCSS: './assets/scss/**/**'
};

const compile = (cb) => {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS))
}

const reload = (cb) => {
  browserSync.reload()
  cb()
}

gulp.task('reload', reload)

gulp.task('compile-scss', compile);

gulp.task('watch', function() {
  gulp.watch(Paths.SCSS, gulp.series(compile, reload));
  gulp.watch('./index.html', browserSync.reload)
});

gulp.task('open', function() {
  compile()
  browserSync.init({
    server: {
      baseDir: '.'
    },
  })
})