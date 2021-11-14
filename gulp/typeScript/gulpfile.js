const gulp = require('gulp')
const typeScript = require('gulp-typescript')

const project = typeScript.createProject('tsconfig.json')

function build(gulpCallback) {
  project.src()
    .pipe(project())
    .pipe(gulp.dest('build'))
    .on('error', error => {
      console.log('error')
    })

  return gulpCallback()
}

exports.default = gulp.series(build)