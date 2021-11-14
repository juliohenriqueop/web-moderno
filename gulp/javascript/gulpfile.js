const gulp = require('gulp')

const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

function build(gulpCallback) {
  gulp.src('src/**/*.js')
    .pipe(babel({
      comments: false,
      presets: ['env']
    }))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'))
    .on('error', error => {
      console.log(error)
    })

  return gulpCallback()
}

exports.default = gulp.series(build)