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
  1: {
    total: 121,
    subset: 116,
    x: 11,
    y: 11
  },
  2: {
    total: 660,
    subset: 652,
    x: 22,
    y: 30
  },
  3: {
    total: 924,
    subset: 917,
    x: 28,
    y: 33
  }
}

swiper.on('onSlideChangeEnd', (s) => {
  const activeIndex = s.activeIndex

  GridMaker(`.graphic-hook-${activeIndex}`, mapping[activeIndex])
})
