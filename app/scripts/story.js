import './adLoader'
import './gascrolldepth'
import './YouTubeTracker'

import resizeWatcher from './resizeWatcher'
import scrollWatcher from './scrollWatcher'

// constants
const bgClassPrefix = 'bg-'

// elements
const body = document.body
const storyHeader = document.querySelector('.sty-header')

// store
const backgroundColorClass = body.className.split(' ').filter((cls) => cls.substr(0, bgClassPrefix.length) === bgClassPrefix)[0]
let storyHeaderHeight = storyHeader.getBoundingClientRect().height
let yOffset = window.scrollY || window.pageYOffset

resizeWatcher.add((d) => {
  storyHeaderHeight = storyHeader.getBoundingClientRect().height

  if (yOffset > storyHeaderHeight) {
    body.classList.remove(backgroundColorClass)
  } else {
    body.classList.add(backgroundColorClass)
  }
})

scrollWatcher.add((d) => {
  yOffset = d.offset

  if (yOffset > storyHeaderHeight) {
    body.classList.remove(backgroundColorClass)
  } else {
    body.classList.add(backgroundColorClass)
  }
})
