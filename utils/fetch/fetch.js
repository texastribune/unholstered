'use strict'

const authorize = require('./authorize')
const google = require('googleapis')

const TYPES = {
  doc: 'text/html',
  sheet: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}

const RETRY_WITH_BACKOFF_ERRORS = ['userRateLimitExceeded', 'quotaExceeded', 'internalServerError', 'backendError']

// const NUM_OF_RETRIES = [...Array(5).keys()] // hacky range(n)

function fetch (files, cb) {
  if (!Array.isArray(files)) files = [files]

  authorize((auth) => {
    const drive = google.drive({auth, version: 'v3', encoding: null})

    files.forEach((file) => {
      const fileId = file.fileId
      const mimeType = TYPES[file.type]

      const req = { fileId, mimeType }

      tryExportUntilSuccess({drive, req, file, iteration: 0}, cb)
    })
  })
}

function tryExportUntilSuccess (opts, cb) {
  opts.drive.files.export(opts.req, (err, res) => {
    if (err) {
      if (err.code === 403 && RETRY_WITH_BACKOFF_ERRORS.some((e) => e === err.errors[0].reason)) {
        return setTimeout(() => tryExportUntilSuccess(opts, cb), Math.pow(opts.iteration++, 2) * Math.random())
      } else {
        return cb(err)
      }
    }

    cb(null, res, opts.file)
  })
}

module.exports = fetch
