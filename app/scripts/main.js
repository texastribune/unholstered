import Swiper from 'swiper'
import './nav'
import GridMaker from './GridMaker'
import BoxMaker from './BoxMaker'
import BarMaker from './BarMaker'
import changeColors from './colors'

const swiper = new Swiper('.swiper-container', {
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
  onTransitionStart: onTransitionStart
})

swiper.runCallbacksOnInit = true

const mapping = {
  1: {
    total: 652,
    subset: 116,
    class: 'shootings'
  },
  2: {
    total: 116,
    subset: 48,
    class: 'shootings'
  }
}

let maker = null
let activeIndex

const nextButton = document.querySelector('#next-button')
const prevButton = document.querySelector('#prev-button')

function onSlideChangeEnd (s) {
  if (activeIndex === s.activeIndex) return

  activeIndex = s.activeIndex

  // if (mapping.hasOwnProperty(activeIndex)) {
  //   if (!maker) maker = GridMaker('#graphic')
  //   maker.render(mapping[activeIndex])
  // } else {
  //   if (maker) maker.hide()
  // }

  if (activeIndex === 2) {
    BarMaker('#graphic')
  }

  const nextButtonText = nextButton.querySelector('.js-next-button-text')

  if (activeIndex > 0) {
    nextButtonText.textContent = 'Next'
    prevButton.classList.remove('is-hidden')
  } else {
    nextButtonText.textContent = 'Begin'
    prevButton.classList.add('is-hidden')
  }
}

function onSlideChangeStart (s) {
  const activeIndex = s.activeIndex
  const icon = nextButton.querySelector('.icon')

  if (activeIndex > 0) {
    icon.classList.remove('icon--animated')
  } else {
    icon.classList.add('icon--animated')
  }
}

function onTransitionStart (s) {
  const activeSlide = s.slides[s.activeIndex].classList

  changeColors(activeSlide)
}
