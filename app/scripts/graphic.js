import * as d3 from 'd3'

import BarMaker from './BarMaker'
import BoxMaker from './BoxMaker'
import GridMaker from './GridMaker'
import WholeMaker from './WholeMaker'
import colorScales from './colorScales'

function graphic (container) {
  let graphic
  const containerEl = d3.select(container)

  let _isInitialized = false

  function isInitialized () {
    return _isInitialized
  }

  function render (graphicType, graphicId, graphicIndex, isUpdate) {
    const data = window.slideData[`${graphicId}-${graphicIndex}`]

    if (!isUpdate) {
      switch (graphicType) {
        case 'grid':
          graphic = GridMaker(containerEl, {
            colorScale: colorScales[graphicId],
            extraMarginBottom: graphicId === 'officers' ? 20 : 0,
            label: graphicId === 'officers' ? 'officers' : 'shootings by police'
          })
          _isInitialized = true
          break
        case 'bar':
          graphic = BarMaker(containerEl)
          _isInitialized = true
          break
        case 'box':
          graphic = BoxMaker(containerEl)
          _isInitialized = true
          break
        case 'whole':
          graphic = WholeMaker(containerEl, {colorScale: colorScales[graphicId]})
          _isInitialized = true
          break
      }
    }

    if (isInitialized()) graphic.render(data)
  }

  function remove () {
    const t = d3.transition().duration(250)

    containerEl.select('svg')
      .transition(t)
      .style('opacity', 1e-6)
      .remove()

    containerEl.select('div')
      .transition(t)
      .style('opacity', 1e-6)
      .remove()

    _isInitialized = false
  }

  return {
    isInitialized,
    remove,
    render
  }
}

export default graphic
