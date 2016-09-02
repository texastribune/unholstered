'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

/**
 * Converts a string from dash or underscore separated to camelCase.
 *
 * @private
 * @param  {String} str
 * @return {String}
 */
function camelCase (str) {
  // remove any dashes or underscores in the string, and grab the following character
  return str.replace(/[\-_]+(\w?)/g, function (match, p1) {
    // uppercase the following letter
    return p1.toUpperCase()
  })
}

/**
 * Gets all the attributes set on an element, and returns them as an Object.
 *
 * @private
 * @param  {Element} element
 * @return {Object}
 */
function getAttributes (element) {
  var attrs = {}

  // if element is empty, or not ELEMENT_NODE, eject
  if (!element || element.nodeType !== 1) return attrs

  // grab all the attributes off the element
  var map = element.attributes

  // if there are no attributes, eject
  if (map.length === 0) return attrs

  // loop through the attributes and build the object
  for (var i = 0; i < map.length; i++) {
    attrs[map[i].name] = map[i].value
  }

  return attrs
}

/**
 * Searches an element's attributes and returns an Object of all the ones that
 * begin with a specified prefix. Each matching attribute name is returned
 * without the prefix, with the remainder converted to camelCase.
 *
 * @private
 * @param  {Element} element
 * @param  {String} prefix
 * @return {Object}
 */
function getMatchingAttributes (element, prefix) {
  // get all the attributes on the element
  var attributes = getAttributes(element)
  var fields = {}

  // loop through the keys of the attributes
  Object.keys(attributes).forEach(function (key) {
    // continue if the key begins with supplied prefix
    if (key.substr(0, prefix.length) === prefix) {
      // grab the value associated with the original key
      var value = attributes[key]

      // slice off the prefix and camelCase what is left
      var field = camelCase(key.slice(prefix.length))

      fields[field] = value
    }
  })

  return fields
}

/**
 * A helper for asynchronously loading scripts.
 *
 * Provides a callback interface for passing a function that will only be called
 * if the script is successfully added to the page.
 *
 * @private
 * @param {Element} global Typically `window` - the browser context to work
 * within
 * @param {String} url The URL for the script to be loaded.
 * @param {Function} [cb] A function to be called once the script successfully
 * loads. Not required.
 * @returns {void}
 * @example
 *
 * loadScript('backup.js', function () {
 *   // anything that depends on that script loading
 * })
 */
function loadScript (global, url, cb) {
  // create the `script` element
  var script = global.document.createElement('script')

  // set its URL
  script.src = url

  // if there is a supplied callback, add it to `onload`
  if (cb) script.onload = cb

  // attach the script to the document body
  global.document.body.appendChild(script)
}

// Sourced from: https://github.com/sindresorhus/object-assign

var hasOwnProperty = Object.prototype.hasOwnProperty
var propIsEnumerable = Object.prototype.propertyIsEnumerable

function toObject (val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined')
  }

  return Object(val)
}

function shouldUseNative () {
  try {
    if (!Object.assign) {
      return false
    }

    // Detect buggy property enumeration order in older V8 versions.

    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
    test1[5] = 'de'
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test2 = {}
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n]
    })
    if (order2.join('') !== '0123456789') {
      return false
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test3 = {}
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter
    })
    if (Object.keys(Object.assign({}, test3)).join('') !==
      'abcdefghijklmnopqrst') {
      return false
    }

    return true
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from
  var to = toObject(target)
  var symbols

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s])

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key]
      }
    }

    if (Object.getOwnPropertySymbols) {
      symbols = Object.getOwnPropertySymbols(from)
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]]
        }
      }
    }
  }

  return to
}

/**
 * Counter used by {uniqueId} to iterate.
 *
 * @private
 * @type {Number}
 */
var idCounter = 0

/**
 * Function for generating identifiers unique to a single browser session.
 * Each time it runs, the integer at the end of the return value will increment.
 *
 * Borrowed from underscore.js: http://underscorejs.org/#uniqueId
 *
 * @param  {String} [prefix] Optional prefix for identifier
 * @return {String}
 * @example
 * var identifier = uniqueId()
 * // returns '1'
 *
 * var prefixedIdentifier = uniqueId('label-')
 * // returns 'label-2'
 */
function uniqueId (prefix) {
  var id = ++idCounter + ''
  return prefix ? prefix + id : id
}

/**
 * AdLoader
 *
 * @param  {Object} opts
 * @return {Object}
 */
function AdLoader (opts) {
  var w = window
  var hasBeenInit = false
  var adSlots

  var defaultOpts = {
    attributePrefix: 'dv-gpt-',
    defaultAdFields: {
      adUnit: '/5805113/basic',
      dimensions: [300, 250]
    },
    globalMappings: {
      banner: [
        [[768, 130], [[728, 90]]]
      ],
      smallBanner: [
        [[508, 100], [[468, 60]]]
      ]
    },
    gptSrc: 'https://www.googletagservices.com/tag/js/gpt.js',
    idPrefix: 'dv-gpt-',
    selector: '.dv-gpt-ad',
    targetingKey: 'tribpedia',
    targetingValue: null
  }

  opts = objectAssign({}, defaultOpts, opts)

  var adElements = Array.prototype.slice.call(document.querySelectorAll(opts.selector))

  function setupService () {
    w.googletag.cmd.push(function () {
      var pubads = w.googletag.pubads()

      if (opts.targetingKey && opts.targetingValue) {
        pubads.setTargeting(opts.targetingKey, opts.targetingValue)
      }

      pubads.enableSingleRequest()
      w.googletag.enableServices()
    })
  }

  function createAds () {
    adSlots = adElements.map(function (element) {
      var matchingAttributes = getMatchingAttributes(element, opts.attributePrefix)
      var localOpts = objectAssign({}, opts.defaultAdFields, matchingAttributes)

      var adElementId = uniqueId(opts.idPrefix)
      element.setAttribute('id', adElementId)

      var adUnit = w.googletag.defineSlot(localOpts.adUnit, localOpts.dimensions, adElementId)

      if (localOpts.mapping && opts.globalMappings.hasOwnProperty(localOpts.mapping)) {
        adUnit.defineSizeMapping(opts.globalMappings[localOpts.mapping])
      }

      if (localOpts.targetingKey && localOpts.targetingValue) {
        adUnit.setTargeting(localOpts.targetingKey, localOpts.targetingValue)
      }

      adUnit.setCollapseEmptyDiv(true)
      adUnit.addService(w.googletag.pubads())

      w.googletag.display(adElementId)

      return adUnit
    })
  }

  function init () {
    if (hasBeenInit) return

    loadScript(w, opts.gptSrc, function () {
      w.googletag.cmd.push(setupService, createAds)

      hasBeenInit = true
    })
  }

  return {
    adSlots: adSlots,
    init: init
  }
}

var dvAds = AdLoader() // singleton

exports.AdLoader = dvAds
