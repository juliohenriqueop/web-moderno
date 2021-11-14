const {
  buildAppHtmlTask,
  buildAppCssTask,
  buildAppJsTask,
  buildAppImagesTask
} = require('./appTasks')

const gulp = require('gulp')

const webserver = require('gulp-webserver')
const watch = require('gulp-watch')

function devServerWatchTask(cb) {
  watch('src/**/*.html', () => gulp.series(buildAppHtmlTask)())
  watch('src/**/*.scss', () => gulp.series(buildAppCssTask)())
  watch('src/**/*.js', () => gulp.series(buildAppJsTask)())
  watch('src/assets/imgs/*.*', () => gulp.series(buildAppImagesTask)())

  return cb()
}

function devServerServeTask() {
  return gulp.src('build')
    .pipe(webserver({
      port: 8080,
      open: false,
      livereload: true
    }))
    .on('error', error => console.log(error))
}

module.exports = {
  devServerWatchTask,
  devServerServeTask
}