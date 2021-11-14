const gulp = require('gulp')

const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

function buildDepsCssTask() {
  const fontAwesomeCSS = 'node_modules/font-awesome/css/font-awesome.css'

  return gulp.src(fontAwesomeCSS)
    .pipe(concat('deps.min.css'))
    .pipe(uglifycss({
      'uglyComments': false
    }))
    .pipe(gulp.dest('build/assets/css'))
    .on('error', error => console.log(error))
}

function buildDepsFontsTask() {
  const fontAwesomeFonts = 'node_modules/font-awesome/fonts/*.*'

  return gulp.src(fontAwesomeFonts)
    .pipe(gulp.dest('build/assets/fonts'))
    .on('error', error => console.log(error))
}

module.exports = {
  buildDepsCssTask,
  buildDepsFontsTask
}