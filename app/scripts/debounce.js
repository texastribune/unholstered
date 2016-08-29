import getTimeStamp from './getTimeStamp'

// Borrowed from underscore.js: http://underscorejs.org/#debounce
export default function (func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function () {
    var last = getTimeStamp() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function () {
    context = this
    args = arguments
    timestamp = getTimeStamp()
    var callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
