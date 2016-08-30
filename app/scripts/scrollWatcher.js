import EventObserver from './EventObserver'
import raf from './raf'

/**
 * `scrollWatcher` alerts any listeners when window's `scroll` event fires.
 * Intelligently doesn't activate the event listener unless it is needed, and
 * will clear the listener if nothing needs it.
 */
function scrollWatcher () {
  var observer = new EventObserver()
  var lastScrollPosition = 0
  var active = false

  function onWindowScroll () {
    requestTick()
  }

  function requestTick () {
    lastScrollPosition = window.scrollY || window.pageYOffset

    if (!active) {
      raf(update)
      active = true
    }
  }

  function update () {
    observer.trigger('scroll', {offset: lastScrollPosition})
    active = false
  }

  return {
    /**
     * Adds a new listener to `scrollWatcher`. Doesn't set the event listener
     * for the `scroll` event until at least one is added.
     *
     * @memberof scrollWatcher
     * @param {Function} callback
     * @return {void}
     */
    add: function (callback) {
      if (!observer.eventHasListeners('scroll')) {
        window.addEventListener('scroll', onWindowScroll, false)
      }

      observer.on('scroll', callback)
    },

    /**
     * Removes a listener from `scrollWatcher`. If there are no more listeners
     * active, the `scroll` event listener is unset.
     *
     * @memberof scrollWatcher
     * @param  {Function} callback
     * @return {void}
     */
    remove: function (callback) {
      observer.off('scroll', callback)

      if (!observer.eventHasListeners('scroll')) {
        window.removeEventListener('scroll', onWindowScroll, false)
      }
    },

    /**
     * Removes all listeners on `scrollWatcher`.
     *
     * @memberof scrollWatcher
     * @return {void}
     */
    clear: function () {
      observer.clearAllListeners('scroll')
      window.removeEventListener('scroll', onWindowScroll, false)
    }
  }
}

export default scrollWatcher() // singleton
