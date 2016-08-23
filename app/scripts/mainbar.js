import Swiper from 'swiper'

import graphic from './graphic'

let STATE = {
  graphic: graphic('#graphic'),
  isUpdate: false,
  slideType: null,
  slideId: null,
  slideIndex: null
}

// global setting
let animationTimeout = null
const bgClassPrefix = 'bg-'

// elements
const body = document.body
const nextButton = document.querySelector('#next-button')
const nextButtonText = nextButton.querySelector('.js-next-button-text')
const prevButton = document.querySelector('#prev-button')
const replayButton = document.querySelector('#replay-button')

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

  // manage graphic
  STATE.graphic.render(STATE.slideType, STATE.slideId, STATE.slideIndex, STATE.isUpdate)

  if (s.isBeginning) {
    nextButtonText.textContent = 'Begin'
    prevButton.classList.add('is-hidden')
  } else if (s.isEnd) {
    nextButton.classList.add('is-hidden')
    replayButton.classList.remove('is-hidden')
  } else {
    if (activeIndex > 0) {
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
  }
}

// all actions that take place when the FINAL slide is reached
function onReachEnd (s) {
  replayButton.addEventListener('click', () => {
    nextButton.classList.remove('is-hidden')
    replayButton.classList.add('is-hidden')

    s.slideTo(0, 1000)
  })
}

Swiper('#swiper-container', {
  direction: 'vertical',
  keyboardControl: true,
  mousewheelControl: true,
  nextButton: '#next-button',
  prevButton: '#prev-button',
  pagination: '.swiper-progress',
  paginationType: 'progress',
  simulateTouch: true,
  speed: 500,
  onSlideChangeStart: onSlideChangeStart,
  onSlideChangeEnd: onSlideChangeEnd,
  onReachEnd: onReachEnd
})
