import { select } from 'd3'
import Swiper from 'swiper'
import './nav'
import GridMaker from './GridMaker'
import './colors'

const swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  keyboardControl: true,
  mousewheelControl: true,
  pagination: '.swiper-progress',
  paginationType: 'progress',
  simulateTouch: true,
  speed: 500
})

const mapping = {
  2: {
    total: 121,
    subset: 116,
    x: 11,
    y: 11
  },
  3: {
    total: 660,
    subset: 652,
    x: 22,
    y: 30
  },
  4: {
    total: 924,
    subset: 917,
    x: 28,
    y: 33
  }
}

swiper.on('onSlideChangeEnd', (s) => {
  const activeIndex = s.activeIndex

  if (mapping.hasOwnProperty(activeIndex)) {
    GridMaker('#graphic', mapping[activeIndex])
  } else {
    select('#graphic svg').remove()
  }
})
