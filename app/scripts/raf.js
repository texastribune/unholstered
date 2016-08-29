/**
 * Maps a basic `requestAnimationFrame` polyfill, if needed. Call whenever you
 * would normally use `window.requestAnimationFrame`.
 *
 * @private
 * @type {Function}
 */
var rAF = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
function (cb) {
  window.setTimeout(cb, 1000 / 60)
}

export default rAF
