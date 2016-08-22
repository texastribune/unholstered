import * as d3 from 'd3'
import getSquareSizing from './getSquareSizing'

function GridMaker (containerEl) {
  let svg, g
  let _isInitialized = false
  const container = d3.select(containerEl)

  const margin = {
    top: 60,
    right: 40,
    bottom: 60,
    left: 20
  }

  const sizing = container.node().parentNode.getBoundingClientRect()

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  const x = d3.scaleBand()
  const y = d3.scaleBand()

  function isInitialized () {
    return _isInitialized
  }

  function init () {
    svg = container.append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('shape-rendering', 'crispEdges')

    g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    _isInitialized = true
  }

  function render (options) {
    if (!isInitialized()) init()

    const transitionTime = options.transitionTime || 500
    const sideLength = getSquareSizing(width, height, options.total)

    const cols = Math.floor(width / sideLength)
    const rows = Math.floor(height / sideLength)

    const padding = options.padding || 0.25

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

    const data = d3.range(options.total)

    // JOIN
    const cells = g.selectAll('rect').data(data, (i) => i)

    // EXIT
    cells.exit()
      .transition()
      .duration(transitionTime)
      .style('fill-opacity', 1e-6)
      .remove()

    // UPDATE
    cells.transition()
      .duration(transitionTime)
      // .delay(() => Math.random() * 1250 + transitionTime)
      // .attr('x', (d) => x(d % cols))
      // .attr('y', (d) => y(Math.floor(d / cols)))
      // .attr('width', xWidth)
      // .attr('height', yWidth)
      .attr('fill', (d) => options.subset && d < options.subset ? 'rgb(209, 70, 33)' : 'rgba(209, 70, 33, 0.3)')

    // ENTER
    cells.enter().append('rect').attr('class', 'cell')
      .attr('x', (d) => x(d % cols))
      .attr('y', (d) => y(Math.floor(d / cols)))
      .attr('width', 0)
      .attr('height', 0)
      .attr('fill', 'rgb(209, 70, 33)')
      .transition()
        .duration(0)
        .delay(() => Math.random() * 1250 + transitionTime)
        .attr('width', xWidth)
        .attr('height', yWidth)
        .attr('fill', (d) => options.subset && d < options.subset ? 'rgba(209, 70, 33, 0.3)' : 'rgb(209, 70, 33)')
  }

  function remove () {
    container.select('svg').remove()
    _isInitialized = false
  }

  return {
    init,
    isInitialized,
    remove,
    render
  }
}

export default GridMaker

// export default function gridMaker (containerEl) {
//   const container = d3.select(containerEl)
//   container.select('svg').remove()
//
//   const svg = container.append('svg')
//   const g = svg.append('g').attr('class', 'grid')
//     .attr('transform', 'translate(20, 20)')
//   const label = svg.append('text')
//
//   function render (params) {
//     const x = d3.scaleBand()
//     const y = d3.scaleBand()
//
//     const sizing = container.node().parentNode.getBoundingClientRect()
//
//     const [width, height] = [sizing.width - 20 * 2, sizing.height - 20 * 2]
//     const side = getSquareSizing(width, height, params.total)
//
//     const cols = Math.floor(width / side)
//     const rows = Math.floor(height / side)
//
//     const padding = params.padding || 0.25
//
//     x.domain(d3.range(cols))
//       .range([0, width])
//       .padding(padding)
//       .paddingOuter(0)
//
//     y.domain(d3.range(rows))
//       .range([0, height])
//       .padding(padding)
//       .paddingOuter(0)
//
//     const data = d3.range(params.total)
//
//     svg
//       .attr('width', sizing.width)
//       .attr('height', sizing.height)
//       .attr('shape-rendering', 'crispEdges')
//
//     // LABEL
//     // let labelText = ''
//     // if (params.subset) {
//     //   labelText = params.subset + ' of '
//     // }
//     // labelText += params.total + ' ' + params.class
//     //
//     // label
//     //   .attr('x', sizing.width / 2 )
//     //   .attr('y', sizing.height - 30 )
//     //   .attr('class', 'chart-label')
//     //   .style('text-anchor', 'middle')
//     //   .text(labelText)
//
//     // JOIN
//     const cells = g.selectAll('rect').data(data, (i) => i)
//
//     const transitionTime = 500
//
//     // EXIT
//     cells.exit()
//       .transition()
//       .duration(transitionTime)
//       .style('fill-opacity', 1e-6)
//       .remove()
//
//     const xWidth = x.bandwidth()
//     const yWidth = y.bandwidth()
//
//     // UPDATE
//     cells.transition()
//       .delay(() => Math.random() * 1250 + transitionTime)
//       .attr('x', (d) => x(d % cols))
//       .attr('y', (d) => y(Math.floor(d / cols)))
//       .attr('width', xWidth)
//       .attr('height', yWidth)
//
//     // ENTER
//     cells.enter().append('rect').attr('class', 'cell')
//       .attr('x', (d) => x(d % cols))
//       .attr('y', (d) => y(Math.floor(d / cols)))
//       .attr('width', 0)
//       .attr('height', 0)
//       .attr('fill', 'rgba(209, 70, 33, 0.3)')
//       .transition()
//         .duration(0)
//         .delay(() => Math.random() * 1250 + transitionTime)
//         .attr('width', xWidth)
//         .attr('height', yWidth)
//         .attr('fill', (d) => d < params.subset ? 'rgb(209, 70, 33)' : 'rgba(209, 70, 33, 0.3)')
//   }
//
//   function hide () {
//     container.style('display', 'none')
//   }
//
//   return {
//     render,
//     hide
//   }
// }
