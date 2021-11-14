const gulp = require('gulp')

const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const uglifycss = require('gulp-uglifycss')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

function buildAppHtmlTask() {
  const allHtmlFiles = 'src/**/*.html'

  return gulp.src(allHtmlFiles)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'))
    .on('error', error => console.log(error))
}

function buildAppCssTask() {
  const scssEntryPoint = 'src/assets/sass/index.scss'

  return gulp.src(scssEntryPoint)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.min.css'))
    .pipe(uglifycss({
      'uglyComments': true
    }))
    .pipe(gulp.dest('build/assets/css'))
    .on('error', error => console.log(error))
}

function buildAppJsTask() {
  const allJsFiles = 'src/assets/js/**/*.js'

  return gulp.src(allJsFiles)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'))
    .on('error', error => console.log(error))
}

function buildAppImagesTask() {
  const allImages = 'src/assets/imgs/**/*.*'

  return gulp.src(allImages)
    .pipe(gulp.dest('build/assets/imgs'))
    .on('error', error => console.log(error))
}

module.exports = {
  buildAppHtmlTask,
  buildAppCssTask,
  buildAppJsTask,
  buildAppImagesTask
}