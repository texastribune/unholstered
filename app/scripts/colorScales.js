import { color } from 'd3'

const colorScales = {
  'shootings-one': {
    base: color('rgba(204, 186, 165, 1)'),
    offBase: color('rgba(204, 186, 165, 0.3)'),
    scale: [
      color('rgba(149, 182, 187, 1)'),
      color('rgba(255, 97, 74, 1)'),
      color('rgba(249, 128, 1, 1)')
    ]
  },
  'shootings-two': {
    base: color('rgba(204, 186, 165, 1)'),
    offBase: color('rgba(204, 186, 165, 0.3)'),
    scale: [
      color('rgba(249, 128, 1, 1)'),
      color('rgba(249, 128, 1, 0.5)')
    ]
  },
  'police-race': [
    color('rgba(224, 173, 43, 1)'),
    color('rgba(149, 182, 187, 1)'),
    color('rgba(255, 97, 74, 1)'),
    color('#ccbaa5'),
    color('#f0e9d7')
  ],
  'officers': {
    base: color('rgba(204, 186, 165, 1)'),
    offBase: color('rgba(204, 186, 165, 0.3)'),
    scale: [
      color('rgba(224, 173, 43, 1)'),
      color('rgba(153, 141, 87, 1)')
    ]
  }
}

export default colorScales
