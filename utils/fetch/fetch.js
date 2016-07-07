'use strict'

const authorize = require('./authorize')
const google = require('googleapis')

const TYPES = {
  doc: 'text/html',
  sheet: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}

function fetch (files, cb) {
  if (!Array.isArray(files)) files = [files]

  authorize((auth) => {
    const drive = google.drive({auth, version: 'v3', encoding: null})

    files.forEach((file) => {
      const fileId = file.fileId
      const mimeType = TYPES[file.type]

      const req = { fileId, mimeType }

      drive.files.export(req, (err, res) => {
        if (err) cb(err)
        cb(null, res, file)
      })
    })
  })
}

module.exports = fetch
