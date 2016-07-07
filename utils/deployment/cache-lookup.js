'use strict'

const lookup = [{
  control: 'no-cache',
  types: ['text/html']
}, {
  control: 'max-age=31536000', // 1 year
  types: ['text/css', 'application/javascript']
}, {
  control: 'max-age=604800', // 1 week
  types: ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
}, {
  control: 'max-age=3600', // 1 hour
  types: ['application/json']
}]

module.exports = (type) => {
  return lookup.find((pair) => {
    return pair.types.some((s) => s === type)
  })
}
