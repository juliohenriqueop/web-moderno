const gulp = require('gulp')

function prepare(gulpCallback) {
  console.log('prepare')
  return gulpCallback()
}

function before(gulpCallback) {
  console.log('before')
  return gulpCallback()
}

function copyFiles(gulpCallback) {
  gulp.src(['pastaA/**/*.txt'])
    .pipe(gulp.dest('pastaB'))

  console.log('The files was copied.')

  return gulpCallback()
}

function after(gulpCallback) {
  console.log('after')
  return gulpCallback()
}

module.exports.default = gulp.series(
  gulp.parallel(
    prepare,
    before
  ),
  copyFiles,
  after
)