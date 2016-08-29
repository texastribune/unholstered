/**
 * If `performance` is available, use it for timing. Otherwise, use `Date`.
 * @type {Object}
 * @private
 */
const clock = typeof window.performance === 'object' ? window.performance : Date

/**
 * Returns a Number representation of the current time. Uses
 * `performance.now()` if available, otherwise uses `Date.now()`.
 * @return {Number}
 */
export default function getTimeStamp () {
  return clock.now()
}
