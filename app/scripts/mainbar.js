/* global ga */

import Swiper from 'swiper'

import debounce from './debounce'
import graphic from './graphic'
import resizeWatcher from './resizeWatcher'

// global states
let STATE = {
  graphic: graphic('#graphic'),
  isUpdate: false,
  slideType: null,
  slideId: null,
  slideIndex: null
}

// event tracking
const eventPercents = [10, 25, 50, 75, 90, 100]
const absoluteEventCache = {}
const percentEventCache = {}

// global setting
let animationTimeout = null
const bgClassPrefix = 'bg-'

// elements
const body = document.body
const graphicContainer = document.querySelector('.graphic-container')
const nextButton = document.querySelector('#next-button')
const nextButtonText = nextButton.querySelector('.js-next-button-text')
const prevButton = document.querySelector('#prev-button')
const replayButton = document.querySelector('#replay-button')

// fires on swiper init
function onInit (s) {
  const normalizedIndex = s.activeIndex + 1

  absoluteEventCache[normalizedIndex] = true

  ga('send', {
    hitType: 'event',
    eventCategory: 'Interactive',
    eventAction: 'Absolute - Slide Depth',
    eventLabel: normalizedIndex
  })
}

// all actions that take place when a slide change BEGINS
function onSlideChangeStart (s) {
  const activeIndex = s.activeIndex
  const activeSlide = s.slides[activeIndex]

  // assess next state
  const currentSlideType = activeSlide.getAttribute('data-slide-type')
  const currentSlideId = activeSlide.getAttribute('data-slide-id')
  const currentSlideIndex = activeSlide.getAttribute('data-slide-index')

  // manage graphic state
  if (STATE.graphic.isInitialized()) {
    const slideTypeIsSame = currentSlideType === STATE.slideType
    const slideIdIsSame = currentSlideId === STATE.slideId

    // if the slide type or ID changes, wipe the slate
    if (!slideTypeIsSame || !slideIdIsSame) {
      STATE.isUpdate = false
      STATE.graphic.remove()
    }

    if (slideIdIsSame) {
      STATE.isUpdate = true
    }
  }

  // save new slide state
  STATE.slideType = currentSlideType || null
  STATE.slideId = currentSlideId || null
  STATE.slideIndex = currentSlideIndex || null

  // manage slide colors
  const slideThemeColor = activeSlide.getAttribute('data-primary-color')

  if (slideThemeColor) {
    body.className.split(' ').forEach((name) => {
      if (name.substr(0, bgClassPrefix.length) === bgClassPrefix) {
        body.classList.remove(name)
      }
    })

    body.classList.add(`${bgClassPrefix}${slideThemeColor}`)
  }

  // icon bounciness toggle
  const icon = nextButton.querySelector('.icon')

  if (activeIndex > 0) {
    icon.classList.remove('icon--animated')
  } else {
    icon.classList.add('icon--animated')
  }
}

// all actions that take place when a slide change ENDS
function onSlideChangeEnd (s) {
  const activeIndex = s.activeIndex
  const numSlides = s.slides.length

  // check for inverted graphic placement and apply class if needed
  if (STATE.slideId === 'officers') {
    graphicContainer.classList.add('graphic-container--inverted')
  } else {
    graphicContainer.classList.remove('graphic-container--inverted')
  }

  // manage graphic
  STATE.graphic.render(STATE.slideType, STATE.slideId, STATE.slideIndex, STATE.isUpdate)

  if (activeIndex > 0 && !s.isEnd) {
    nextButtonText.textContent = 'Next'
    nextButton.classList.remove('is-hidden')
    prevButton.classList.remove('is-hidden')
    replayButton.classList.add('is-hidden')

    window.clearTimeout(animationTimeout)

    animationTimeout = window.setTimeout(() => {
      const icon = nextButton.querySelector('.icon')
      icon.classList.add('icon--animated')
    }, 1000 * 30)
  }

  // manage absolute slide depth events
  const normalizedIndex = s.activeIndex + 1
  const percentComplete = normalizedIndex / numSlides * 100

  if (!absoluteEventCache[normalizedIndex]) {
    absoluteEventCache[normalizedIndex] = true

    ga('send', {
      hitType: 'event',
      eventCategory: 'Interactive',
      eventAction: 'Absolute - Slide Depth',
      eventLabel: `${normalizedIndex}/${numSlides}`
    })
  }

  eventPercents.forEach((p) => {
    if (percentComplete >= p && !percentEventCache[p]) {
      percentEventCache[p] = true

      ga('send', {
        hitType: 'event',
        eventCategory: 'Interactive',
        eventAction: 'Percent - Slide Depth',
        eventLabel: `${p}%`
      })
    }
  })
}

// all actions that take place when the FIRST slide is reached
function onReachBeginning (s) {
  nextButtonText.textContent = 'Begin'
  nextButton.classList.remove('is-hidden')
  prevButton.classList.add('is-hidden')
}

// all actions that take place when the FINAL slide is reached
function onReachEnd (s) {
  nextButton.classList.add('is-hidden')
  replayButton.classList.remove('is-hidden')
}

replayButton.addEventListener('click', () => {
  nextButton.classList.remove('is-hidden')
  replayButton.classList.add('is-hidden')

  swiper.slideTo(0, 1000)
})

function onResize () {
  STATE.graphic.remove(true)
  STATE.graphic.render(STATE.slideType, STATE.slideId, STATE.slideIndex, false)
}

resizeWatcher.add(debounce(onResize, 250))

const swiper = Swiper('#swiper-container', {
  direction: 'vertical',
  keyboardControl: true,
  mousewheelControl: true,
  nextButton: '#next-button',
  prevButton: '#prev-button',
  pagination: '.swiper-progress',
  paginationType: 'progress',
  simulateTouch: true,
  speed: 500,
  onInit,
  onSlideChangeStart,
  onSlideChangeEnd,
  onReachBeginning,
  onReachEnd
})
