import BarMaker from './BarMaker'
import BoxMaker from './BoxMaker'
import GridMaker from './GridMaker'
import Swiper from 'swiper'
import slideData from './data'

// global setting
let animationTimeout = null
let graphic
let activeSlideId
const bgClassPrefix = 'bg-'

// elements
const body = document.body
const nextButton = document.querySelector('#next-button')
const nextButtonText = nextButton.querySelector('.js-next-button-text')
const prevButton = document.querySelector('#prev-button')
const replayButton = document.querySelector('#replay-button')

function onSlideChangeStart (s) {
  const activeIndex = s.activeIndex
  const activeSlide = s.slides[activeIndex]

  const slideId = activeSlide.getAttribute('data-chart-id')

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
  if (graphic && (activeSlide.getAttribute('data-type') === 'text-only' || !slideData.hasOwnProperty(slideId))) {
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
  const slideId = activeSlide.getAttribute('data-chart-id')
  const slideIndex = parseInt(activeSlide.getAttribute('data-slide-index'), 10)

  if (slideData.hasOwnProperty(slideId)) {
    if (graphic && activeSlideId !== slideId) graphic.remove()

    if (slideType === 'grid') {
      if (!graphic || graphic.type() !== 'grid') graphic = GridMaker('#graphic')
      graphic.render(slideData[slideId], slideIndex)
    } else if (slideType === 'box') {
      if (!graphic || graphic.type() !== 'box') graphic = BoxMaker('#graphic')
      graphic.render(slideIndex)
    } else if (slideType === 'bar') {
      if (!graphic || graphic.type() !== 'bar') graphic = BarMaker('#graphic')
      graphic.render(slideIndex)
    }

    activeSlideId = slideId
  }

  console.log(activeIndex)
  // Manage before/after button states
  if (s.isBeginning) {
    nextButtonText.textContent = 'Begin'
    prevButton.classList.add('is-hidden')
  } else if(s.isEnd) {
    nextButton.classList.add('is-hidden')
    replayButton.classList.remove('is-hidden')
  } else {
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

function onReachEnd (s) {
  replayButton.onclick=function() {
    nextButton.classList.remove('is-hidden')
    replayButton.classList.add('is-hidden')

    swiper.slideTo(0, 1000)
  }
}

var swiper = Swiper('#swiper-container', {
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
