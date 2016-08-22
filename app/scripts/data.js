import { range } from 'd3'

const shootingRanges = [
  [244, 'red'],
  [243, 'pink'],
  [153, 'yellow'],
  [6, 'blue'],
  [15, 'magenta']
]

const shootings = range(658).map((i) => {
  return {
    value: i,
    slide1: 'rgb(209, 70, 33)',
    slide2: calculateRange(i, shootingRanges, 'rgba(209, 70, 33, 0.3)'),
    slide3: calculateRange(i, shootingRanges, 'rgba(209, 70, 33, 0.3)')
  }
})

shootings.name = 'shootings'

const shootingsTwo = range(658).map((i) => {
  return {
    value: i,
    slide10: calculateRange(i, [
      [111, 'pink']
    ], 'rgba(209, 70, 33, 0.3)'),
    slide11: calculateRange(i, [
      [48, 'red'],
      [111, 'pink']
    ], 'rgba(209, 70, 33, 0.3)'),
    slide12: calculateRange(i, [
      [65, 'pink']
    ], 'rgba(209, 70, 33, 0.3)')
  }
})

shootingsTwo.name = 'shootings'

const officers = range(886).map((i) => {
  return {
    value: i,
    slide13: '#ccbaa5',
    slide14: calculateRange(i, [
      [23, 'pink'],
      [9, 'red'],
      [11, 'yellow'],
      [2, 'blue'],
      [1, 'green']
    ], '#ccbaa5'),
    slide15: calculateRange(i, [
      [6, 'green']
    ], '#ccbaa5')
  }
})

officers.name = 'officers'

function calculateRange (i, ranges, defaultColor) {
  let total = 0
  let color

  ranges.some((range) => {
    const state = i <= (total += range[0])
    if (state) color = range[1]
    return state
  })

  return color || defaultColor
}

export default {
  'shootings-1': shootings,
  'shootings-2': shootingsTwo,
  categories: [],
  officers,
  population: []
}
