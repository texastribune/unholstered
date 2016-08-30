/* global ga */

import 'autotrack'

ga('create', 'UA-9827490-1', 'auto')

ga('require', 'eventTracker')

ga('require', 'cleanUrlTracker', {
  stripQuery: true,
  queryDimensionIndex: 1,
  indexFilename: 'index.html'
})

ga('require', 'pageVisibilityTracker', {
  fieldsObj: {
    nonInteraction: null
  }
})

ga('require', 'outboundLinkTracker')

ga('send', 'pageview')
