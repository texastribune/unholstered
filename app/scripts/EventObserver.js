/**
 * An implementation of the Observer pattern. Used to share triggers across
 * different functions that need to respond to the same action.
 *
 * @constructor
 * @example
 * var observer = new EventObserver()
 *
 * function logData(data) {
 *   console.log(data)
 * }
 *
 * observer.on('activate', logData)
 * observer.trigger('activate', {message: 'hello world'})
 *
 * // logs {message: 'hello world'}
 */
export default function EventObserver () {
  this.callbacks = {}
}

/**
 * Method to add new callback to a trigger. Will create the trigger if it does
 * not exist. Can accept multiple, space-delimited triggers.
 *
 * @param  {String} event Name or names of triggers.
 * @param  {Function} callback Function to be called when triggered.
 * @return {void}
 */
EventObserver.prototype.on = function (event, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('EventObserver.on callback expects a function.')
  }

  event.split(/\s+/).forEach(function (e) {
    if (!this.eventExists(e)) {
      this.callbacks[e] = []
    }

    this.callbacks[e].push(callback)
  }, this)
}

/**
 * Method to remove a callback from a trigger. Can remove multiple,
 * space-delimited triggers.
 *
 * @param  {String} event Name or names of triggers.
 * @param  {Function} callback Function to be removed.
 * @return {void}
 */
EventObserver.prototype.off = function (event, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('EventObserver.off callback expects a function.')
  }

  event.split(/\s+/).forEach(function (e) {
    if (!this.eventExists(e)) return

    this.callbacks[e] = this.callbacks[e].filter(function (cb) {
      return cb === callback
    })
  }, this)
}

/**
 * Clears all listeners off a trigger.
 *
 * @param  {String} event Name of a trigger.
 * @return {void}
 */
EventObserver.prototype.clearAllListeners = function (event) {
  if (this.eventExists(event)) delete this.callbacks[event]
}

/**
 * Method to trigger an event. Will pass in the provided data to each callback
 * that has been set on the trigger. Can activate multiple,
 * space-delimited triggers.
 *
 * @param  {String} event Name or names of triggers.
 * @param  {Object} data Data to pass to each callback activated on a trigger.
 * @return {void}
 */
EventObserver.prototype.trigger = function (event, data) {
  data = data || {}

  event.split(/\s+/).forEach(function (e) {
    if (!this.eventExists(e)) return

    this.callbacks[e].forEach(function (callback) {
      callback(data)
    })
  }, this)
}

/**
 * Checks to see if any listeners exist for a given event. Useful for checking
 * to see if any work could be skipped if nothing is there to receive it.
 *
 * @param  {String} event Name of a trigger.
 * @return {Boolean} Whether a trigger has listeners or not.
 */
EventObserver.prototype.eventHasListeners = function (event) {
  if (!this.eventExists(event)) return false

  return !this.callbacks[event].length === 0
}

/**
 * Used internally by EventObserver to test for a trigger's existence.
 * @private
 * @param  {String} event Name of trigger.
 * @return {Boolean}
 */
EventObserver.prototype.eventExists = function (event) {
  return this.callbacks.hasOwnProperty(event)
}
