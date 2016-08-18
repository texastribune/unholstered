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
  pagination: '.swiper-progress',
  paginationType: 'progress',
  simulateTouch: true,
  speed: 500,
  onSlideChangeEnd: graphicHandler
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

function graphicHandler (s) {
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
}

swiper.on('onTransitionStart', (s) => {
  const activeSlide = s.slides[s.activeIndex].classList

  changeColors(activeSlide)
})
