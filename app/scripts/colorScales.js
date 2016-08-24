import { color } from 'd3'

const colorScales = {
  'shootings-one': {
    base: color('rgba(204, 186, 165, 1)'),
    offBase: color('rgba(204, 186, 165, 0.5)'),
    scale: [
      color('rgba(156, 53, 25, 1)'),
      color('rgba(209, 70, 33, 1)'),
      color('rgba(249, 128, 1, 1)')
    ]
  },
  'shootings-two': {
    base: color('rgba(204, 186, 165, 1)'),
    offBase: color('rgba(204, 186, 165, 0.5)'),
    scale: [
      color('rgba(156, 53, 25, 1)'),
      color('rgba(209, 70, 33, 1)'),
      color('rgba(249, 128, 1, 1)')
    ]
  },
  'police-race': [
    color('#9c3519'),
    color('#d14621'),
    color('#f98001'),
    color('#ccbaa5'),
    color('#f0e9d7')
  ],
  'officers': {
    base: color('rgba(204, 186, 165, 1)'),
    offBase: color('rgba(204, 186, 165, 0.5)'),
    scale: [
      color('rgba(224, 173, 43, 1)')
    ]
  }
}

export default colorScales
