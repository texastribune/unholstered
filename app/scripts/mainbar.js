import GridMaker from './GridMaker'
import Swiper from 'swiper'
import slideData from './data'

// global setting
let animationTimeout = null
let graphic
const bgClassPrefix = 'bg-'

// elements
const body = document.body
const nextButton = document.querySelector('#next-button')
const nextButtonText = nextButton.querySelector('.js-next-button-text')
const prevButton = document.querySelector('#prev-button')

function onSlideChangeStart (s) {
  const activeIndex = s.activeIndex
  const activeSlide = s.slides[activeIndex]

  const slideIndex = parseInt(activeSlide.getAttribute('data-slide-index'), 10)

  // Manage slide colors
  const slideThemeColor = activeSlide.getAttribute('data-primary-color')

  if (slideThemeColor) {
    body.className.split(' ').forEach((name) => {
      if (name.substr(0, bgClassPrefix.length) === bgClassPrefix) {
        body.classList.remove(name)
      }
    })

    body.classList.add(`${bgClassPrefix}${slideThemeColor}`)
  }

  // Handle graphic removal
  if (graphic && (activeSlide.getAttribute('data-type') === 'text-only' || !slideData.hasOwnProperty(slideIndex))) {
    graphic.remove()
  }

  // Icon bounciness toggle
  const icon = nextButton.querySelector('.icon')

  if (activeIndex > 0) {
    icon.classList.remove('icon--animated')
  } else {
    icon.classList.add('icon--animated')
  }
}

function onSlideChangeEnd (s) {
  const activeIndex = s.activeIndex
  const activeSlide = s.slides[activeIndex]

  const slideType = activeSlide.getAttribute('data-type')
  const slideIndex = parseInt(activeSlide.getAttribute('data-slide-index'), 10)

  if (slideData.hasOwnProperty(slideIndex)) {
    if (slideType === 'grid') {
      graphic = GridMaker('#graphic')
      graphic.render(slideData[slideIndex])
    }
  }

  // Manage before/after button states
  if (activeIndex > 0) {
    nextButtonText.textContent = 'Next'
    prevButton.classList.remove('is-hidden')

    window.clearTimeout(animationTimeout)

    animationTimeout = window.setTimeout(() => {
      const icon = nextButton.querySelector('.icon')
      icon.classList.add('icon--animated')
    }, 1000 * 30)
  } else {
    nextButtonText.textContent = 'Begin'
    prevButton.classList.add('is-hidden')
  }
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
  onSlideChangeEnd: onSlideChangeEnd
})
