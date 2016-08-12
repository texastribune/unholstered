import Swiper from 'swiper'
import './nav'
import GridMaker from './GridMaker'
import changeColors from './colors'

const swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  keyboardControl: true,
  mousewheelControl: true,
  pagination: '.swiper-progress',
  paginationType: 'progress',
  simulateTouch: true,
  speed: 500
})

swiper.runCallbacksOnInit = true

const mapping = {
  1: {
    total: 652,
    subset: 116
  },
  2: {
    total: 116,
    subset: 48
  }
}

let maker = null

function graphicHandler (s) {
  const activeIndex = s.activeIndex

  if (mapping.hasOwnProperty(activeIndex)) {
    if (!maker) maker = GridMaker('#graphic')
    maker.render(mapping[activeIndex])
  } else {
    if (maker) maker.hide()
  }
}

swiper.on('slideChangeEnd', graphicHandler)

swiper.on('onTransitionStart', (s) => {
  const activeSlide = s.slides[s.activeIndex].classList

  changeColors(activeSlide)
})
