const fs = require('fs')
const path = require('path')
const gulp = require('gulp')

const decomment = require('gulp-decomment')
const beautify = require('gulp-jsbeautifier')
const eslint = require('gulp-eslint')
const shell = require('gulp-shell')

const src = 'web-moderno'
const dest = 'build'

const pathsFile = 'paths.txt'

const cspellCommands = []
cspellCommands.push(`npx cspell`)
cspellCommands.push(`-c ${src}/../cspell.json`)
cspellCommands.push('--gitignore')
cspellCommands.push('--no-progress')

const codeCspellCommands = [...cspellCommands]
codeCspellCommands.push('--locale en,pt,lorem')
codeCspellCommands.push(`${dest}/**/*.html`)
codeCspellCommands.push(`${dest}/**/*.css`)
codeCspellCommands.push(`${dest}/**/*.js`)
codeCspellCommands.push(`${dest}/**/*.jsx`)
codeCspellCommands.push(`${dest}/**/*.ts`)
codeCspellCommands.push(`${dest}/**/*.tsx`)
codeCspellCommands.push(`${dest}/**/*.vue`)
codeCspellCommands.push(`${dest}/**/*.sql`)

const pathsCspellCommands = [...cspellCommands]
pathsCspellCommands.push('--locale en,pt')
pathsCspellCommands.push(pathsFile)

function uncommentJs() {
  return gulp.src(`${src}/**/*.js`)
    .pipe(decomment({ trim: false, tolerant: true }))
    .pipe(beautify({ indent_size: 2 }))
    .pipe(gulp.dest(dest))
}

function uncommentHtml() {
  return gulp.src(`${src}/**/*.html`)
    .pipe(decomment.html({ trim: false, tolerant: true }))
    .pipe(beautify({ indent_size: 2 }))
    .pipe(gulp.dest(dest))
}

function duplicate() {
  return gulp.src([`${src}/**`, `!${src}/**/*.js`, `!${src}/**/*.html`], { dot: true })
    .pipe(gulp.dest(dest))
}

function lint() {
  return gulp.src([
    `${dest}/**/*.js`,
    `${dest}/**/*.jsx`,
    `${dest}/**/*.ts`,
    `${dest}/**/*.tsx`,
    `${dest}/**/*.vue`
  ])
    .pipe(eslint({ configFile: '.eslintrc.json', useEslintrc: false, fix: true }))
    .pipe(eslint.format())
}

function createPathsFile(callback) {
  const nestedPaths = []

  function getPaths(root) {
    const paths = fs.readdirSync(root)

    paths.forEach(currentPath => {
      const resolvedPath = path.resolve(root, currentPath)
      const isDirectory = fs.statSync(resolvedPath).isDirectory()

      if (isDirectory) {
        getPaths(resolvedPath)
      }
      else {
        nestedPaths.push(resolvedPath)
      }
    })
  }

  getPaths(`${dest}`)

  fs.writeFileSync(pathsFile, nestedPaths.join('\n'))

  callback()
}

exports.uncomment = gulp.parallel(uncommentJs, uncommentHtml)
exports.duplicate = gulp.series(duplicate)
exports.lint = gulp.series(lint)

exports.spellCheckCode = shell.task(codeCspellCommands.join(' '), {
  ignoreErrors: true
})

exports.spellCheckPaths = gulp.series(
  createPathsFile,
  shell.task(pathsCspellCommands.join(' '), {
    ignoreErrors: true
  })
)

exports.default = gulp.parallel(
  uncommentJs,
  uncommentHtml,
  duplicate
)