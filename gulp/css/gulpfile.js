const gulp = require('gulp')
const sass = require('gulp-sass')
const uglifyCSS = require('gulp-uglifycss')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')

function build(gulpCallback) {
  gulp.src('src/sass/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('estilo.min.css'))
    .pipe(uglifyCSS({
      "uglyComments": true
    }))
    .pipe(gulp.dest('build/css'))
    .on('error', error => {
      console.log(error)
    })

  return gulpCallback()
}

function copyIndexToBuild(gulpCallback) {
  gulp.src('src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'))
    .on('error', error => {
      console.log(error)
    })

  return gulpCallback()
}

exports.default = gulp.parallel(
  build,
  copyIndexToBuild
)