import Swiper from 'swiper'
import './nav'
import GridMaker from './GridMaker'
// import BarMaker from './BarMaker'

const swiper = new Swiper('#swiper-container', {
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

const mapping = {
  3: {
    total: 658,
    class: 'shootings'
  },
  4: {
    total: 658,
    subset: 244,
    class: 'shootings'
  }
}

const body = document.body
const bgClassPrefix = 'bg-'
const nextButton = document.querySelector('#next-button')
const prevButton = document.querySelector('#prev-button')
let animationTimeout
const graphic = GridMaker('#graphic')

function onSlideChangeEnd (s) {
  const activeIndex = s.activeIndex

  // if (mapping.hasOwnProperty(activeIndex)) {
  //   if (!maker) maker = GridMaker('#graphic')
  //   maker.render(mapping[activeIndex])
  // } else {
  //   if (maker) maker.hide()
  // }

  if (mapping.hasOwnProperty(activeIndex)) {
    if (!graphic.isInitialized()) graphic.init()
    graphic.render(mapping[activeIndex])
  }

  const nextButtonText = nextButton.querySelector('.js-next-button-text')

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

function onSlideChangeStart (s) {
  const activeIndex = s.activeIndex
  const activeSlide = s.slides[activeIndex]

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
  if ((graphic && activeSlide.getAttribute('data-type') === 'text-only') || !mapping.hasOwnProperty(activeIndex)) {
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
