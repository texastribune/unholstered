'use strict'

const gulp = require('gulp')
const gulpIf = require('gulp-if')
const htmlmin = require('gulp-htmlmin')
const map = require('vinyl-map')
const path = require('path')
const quaff = require('quaff')
const rename = require('gulp-rename')
const size = require('gulp-size')

const bs = require('./browsersync')
const nunjucksEnv = require('./nunjucks')

const config = require('../project.config')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = () => {
  const data = quaff(config.dataDir)

  const nunjuckify = map((code) => {
    return nunjucksEnv.renderString(code.toString(), { data })
  })

  return gulp.src(['./app/**/*.html', '!./app/templates/**', '!./app/scripts/**'])
    .pipe(nunjuckify)
    .pipe(rename((file) => {
      if (file.basename !== 'index') {
        file.dirname = path.join(file.dirname, file.basename)
        file.basename = 'index'
      }
    }))
    .pipe(gulp.dest('./.tmp'))
    .pipe(gulpIf(IS_PRODUCTION, htmlmin({collapseWhitespace: true})))
    .pipe(gulpIf(IS_PRODUCTION, gulp.dest('./dist')))
    .pipe(bs.stream({once: true}))
    .pipe(size({title: 'templates', showFiles: true}))
}
