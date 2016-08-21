import * as d3 from 'd3'
import getSquareSizing from './getSquareSizing'

export default function gridMaker (selection) {
  const container = d3.select(selection)
  const svg = container.append('svg')
  const g = svg.append('g').attr('class', 'grid')
    .attr('transform', 'translate(20, 20)')
  const label = svg.append('text')

  function render (params) {
    container.style('display', 'block')
    const x = d3.scaleBand()
    const y = d3.scaleBand()

    const sizing = container.node().parentNode.getBoundingClientRect()

    const [width, height] = [sizing.width - 20 * 2, sizing.height - 20 * 2]
    const side = getSquareSizing(width, height, params.total)

    const cols = Math.floor(width / side)
    const rows = Math.floor(height / side)

    const padding = params.padding || 0.25

    x.domain(d3.range(cols))
      .range([0, width])
      .padding(padding)
      .paddingOuter(0)

    y.domain(d3.range(rows))
      .range([0, height])
      .padding(padding)
      .paddingOuter(0)

    const data = d3.range(params.total)

    svg
      .attr('width', sizing.width)
      .attr('height', sizing.height)
      .attr('shape-rendering', 'crispEdges')

    // LABEL
    // let labelText = ''
    // if (params.subset) {
    //   labelText = params.subset + ' of '
    // }
    // labelText += params.total + ' ' + params.class
    //
    // label
    //   .attr('x', sizing.width / 2 )
    //   .attr('y', sizing.height - 30 )
    //   .attr('class', 'chart-label')
    //   .style('text-anchor', 'middle')
    //   .text(labelText)

    // JOIN
    const cells = g.selectAll('rect').data(data, (i) => i)

    const transitionTime = 500

    // EXIT
    cells.exit()
      .transition()
      .duration(transitionTime)
      .style('fill-opacity', 1e-6)
      .remove()

    const xWidth = x.bandwidth()
    const yWidth = y.bandwidth()

    // UPDATE
    cells.transition()
      .delay(() => Math.random() * 1250 + transitionTime)
      .attr('x', (d) => x(d % cols))
      .attr('y', (d) => y(Math.floor(d / cols)))
      .attr('width', xWidth)
      .attr('height', yWidth)

    // ENTER
    cells.enter().append('rect').attr('class', 'cell')
      .attr('x', (d) => x(d % cols))
      .attr('y', (d) => y(Math.floor(d / cols)))
      .attr('width', 0)
      .attr('height', 0)
      .attr('fill', 'rgba(209, 70, 33, 0.3)')
      .transition()
        .duration(0)
        .delay(() => Math.random() * 1250 + transitionTime)
        .attr('width', xWidth)
        .attr('height', yWidth)
        .attr('fill', (d) => d < params.subset ? 'rgb(209, 70, 33)' : 'rgba(209, 70, 33, 0.3)')
  }

  function hide () {
    container.style('display', 'none')
  }

  return {
    render,
    hide
  }
}
