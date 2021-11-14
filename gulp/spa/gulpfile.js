const gulp = require('gulp')

const {
  buildAppHtmlTask,
  buildAppCssTask,
  buildAppJsTask,
  buildAppImagesTask
} = require('./gulp_tasks/appTasks')

const {
  buildDepsCssTask,
  buildDepsFontsTask
} = require('./gulp_tasks/depsTasks')

const {
  devServerWatchTask,
  devServerServeTask
} = require('./gulp_tasks/devServerTasks')

const buildTask = gulp.parallel(
  gulp.parallel(
    buildAppHtmlTask,
    buildAppCssTask,
    buildAppJsTask,
    buildAppImagesTask
  ),

  gulp.parallel(
    buildDepsCssTask,
    buildDepsFontsTask
  )
)

const startDevServerTask = gulp.series(
  buildTask,
  devServerWatchTask,
  devServerServeTask
)

module.exports.buildTask = buildTask
module.exports.startDevServerTask = startDevServerTask

module.exports.default = buildTask