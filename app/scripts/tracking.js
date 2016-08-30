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

function onDonationLinkClick (e) {
  const link = e.target
  const href = link.href

  if (!navigator.sendBeacon) {
    link.target = '_blank'
  }

  ga('send', {
    hitType: 'event',
    eventCategory: 'Interactive',
    eventAction: 'Support',
    eventLabel: href
  }, {
    transport: 'beacon'
  })
}

const donationLinks = document.querySelectorAll('.js-donate-outbound')

for (let i = 0; i < donationLinks.length; i++) {
  donationLinks[i].addEventListener('click', onDonationLinkClick, true)
}
