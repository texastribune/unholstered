import * as d3 from 'd3'
import checkIfMobile from './isMobile'
import getSquareSizing from './getSquareSizing'

function GridMaker (container) {
  let svg, g //, gLabel
  const isMobile = checkIfMobile()

  const margin = {
    top: isMobile ? 20 : 60,
    right: isMobile ? 20 : 40,
    bottom: isMobile ? 40 : 60,
    left: 30
  }

  const sizing = container.node().parentNode.getBoundingClientRect()

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  const x = d3.scaleBand()
  const y = d3.scaleBand()

  let hasBeenInitialized = false

  function init () {
    svg = container.append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('shape-rendering', 'crispEdges')

    g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // gLabel = container.append('div')
    //   .attr('class', 'chart-label')
    //   .style('padding', `0 ${margin.right}px 0 ${margin.left}px`)
    //   .style('opacity', 0)

    hasBeenInitialized = true
  }

  function render (data) {
    if (!hasBeenInitialized) init()

    data = preprocessData(data)

    const transitionTime = 500
    const sideLength = getSquareSizing(width, height, data.length)

    const cols = Math.floor(width / sideLength)
    const rows = Math.floor(height / sideLength)

    const padding = 0.25

    x.domain(d3.range(cols))
      .range([0, width])
      .padding(padding)
      .paddingOuter(0)

    y.domain(d3.range(rows))
      .range([0, height])
      .padding(padding)
      .paddingOuter(0)

    const xWidth = x.bandwidth()
    const yWidth = y.bandwidth()

    // JOIN
    const cells = g.selectAll('rect').data(data, (d) => d.value)

    // EXIT
    cells.exit()
      .transition()
      .duration(transitionTime)
      .style('fill-opacity', 1e-6)
      .remove()

    // UPDATE
    cells.transition('update')
      .duration(transitionTime)
      .attr('x', (d, i) => x(i % cols))
      .attr('y', (d, i) => y(Math.floor(i / cols)))
      .attr('width', xWidth)
      .attr('height', yWidth)
      .attr('fill', (d) => d.fillColor)

    // ENTER
    cells.enter().append('rect').attr('class', 'cell')
      .attr('x', (d, i) => x(i % cols))
      .attr('y', (d, i) => y(Math.floor(i / rows)))
      .attr('width', 0)
      .attr('height', 0)
      .attr('fill', (d) => d.fillColor)
      .transition('enter')
        .duration(0)
        .delay(() => Math.random() * 1250 + transitionTime)
        .attr('width', xWidth)
        .attr('height', yWidth)

    // gLabel.text(`${options.length} total ${options.name}`)
    //
    // gLabel.style('bottom', `${margin.bottom / 3}px`)
    //   .transition()
    //     .duration(750 + transitionTime)
    //     .style('opacity', 1)
  }

  function preprocessData (data) {
    // get the grand total of squares we are working with
    const total = d3.sum(data, (d) => d.value)

    // map data to the format d3 needs
    return d3.range(total).map((i) => {
      return {
        value: i,
        fillColor: '#ccbaa5'
      }
    })
  }

  return {
    init,
    render
  }
}

export default GridMaker
