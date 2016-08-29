import EventObserver from './EventObserver'
import raf from './raf'

/**
 * `resizeWatcher` alerts any listeners when window's `resize` event fires.
 * Intelligently doesn't activate the event listener unless it is needed, and
 * will clear the listener if nothing needs it.
 */
function resizeWatcher () {
  var observer = new EventObserver()
  var width = 0
  var height = 0
  var active = false

  function onWindowResize () {
    width = window.innerWidth || document.documentElement.clientWidth
    height = window.innerHeight || document.documentElement.clientHeight

    requestTick()
  }

  function requestTick () {
    if (!active) {
      raf(update)
      active = true
    }
  }

  function update () {
    observer.trigger('resize', { width: width, height: height })

    active = false
  }

  return {
    /**
     * Adds a new listener to `resizeWatcher`. Doesn't set the event listener
     * for the `resize` event until at least one is added.
     *
     * @memberof resizeWatcher
     * @param {Function} callback
     * @return {void}
     */
    add: function (callback) {
      if (!observer.eventHasListeners('resize')) {
        window.addEventListener('resize', onWindowResize, false)
      }

      observer.on('resize', callback)
    },

    /**
     * Removes a listener from `resizeWatcher`. If there are no more listeners
     * active, the `resize` event listener is unset.
     *
     * @memberof resizeWatcher
     * @param  {Function} callback
     * @return {void}
     */
    remove: function (callback) {
      observer.off('resize', callback)

      if (!observer.eventHasListeners('resize')) {
        window.removeEventListener('resize', onWindowResize, false)
      }
    },

    /**
     * Removes all listeners on `resizeWatcher`.
     *
     * @memberof resizeWatcher
     * @return {void}
     */
    clear: function () {
      observer.clearAllListeners('resize')
      window.removeEventListener('resize', onWindowResize, false)
    }
  }
}

export default resizeWatcher() // singleton
