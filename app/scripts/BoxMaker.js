import * as d3 from 'd3'
import checkIfMobile from './isMobile'
import wordwrap from './wordwrap'

d3.selection.prototype.tspans = function (lines, lh) {
  return this.selectAll('tspan')
    .data(lines)
    .enter()
    .append('tspan')
    .text(function (d) { return d })
    .attr('x', 0)
    .attr('dy', function (d, i) { return i ? lh || 15 : 0 })
}

function BoxMaker (container) {
  let svg, g, xAxisG
  const isMobile = checkIfMobile()

  const fillColor = 'rgba(255, 97, 74, 1)'
  const fadedColor = 'rgba(160, 81, 71, 1)'

  const sizing = container.node().parentNode.getBoundingClientRect()

  const margin = {
    top: isMobile ? 20 : sizing.height * 0.15,
    right: 40,
    bottom: isMobile ? 70 : sizing.height * 0.15,
    left: 40
  }

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  const x = d3.scaleBand()
  const y = d3.scaleLinear()

  let hasBeenInitialized = false

  function init () {
    svg = container.append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('shape-rendering', 'crispEdges')

    g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    xAxisG = g.append('g')
      .attr('class', 'x axis box-chart-axis')
      .attr('transform', `translate(0, ${height})`)

    hasBeenInitialized = true
  }

  function render (data, isUpdate = false) {
    if (!hasBeenInitialized) init()

    x.domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.1)
      .paddingOuter(0)

    y.domain([0, 100])
      .range([height, 0])

    const xAxis = d3.axisBottom(x)

    const bars = g.selectAll('.gradient-bar').data(data, (d) => d.label)

    const t = d3.transition().duration(250)

    bars.selectAll('.gradient-rect')
      .data(data, (d) => d.label)
      .transition(t)
      .attr('fill', 'url(#diagonal)')
      .attr('fill-opacity', (d) => d.selected ? 1 : 0.3)
      .attr('stroke', (d) => d.selected ? fillColor : fadedColor)

    bars.selectAll('.filled-rect')
      .data(data, (d) => d.label)
      .transition(t)
      .attr('fill', (d) => d.selected ? fillColor : fadedColor)
      .attr('stroke', (d) => d.selected ? fillColor : fadedColor)

    const barsGroup = bars.enter().append('g').attr('class', 'gradient-bar')

    barsGroup.append('rect')
      .attr('class', 'gradient-rect')
      .attr('x', (d) => x(d.label))
      .attr('y', 0)
      .attr('width', x.bandwidth)
      .attr('height', height)
      .attr('fill', 'url(#diagonal)')
      .attr('fill-opacity', (d) => d.selected ? 1 : 0.3)
      .attr('stroke', (d) => d.selected ? fillColor : fadedColor)
      .attr('stroke-width', '2')
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)

    const barGroup = barsGroup.append('g')

    barGroup.append('rect')
      .attr('class', 'filled-rect')
      .attr('x', (d) => x(d.label))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth)
      .attr('height', (d) => height - y(d.value))
      .attr('fill', (d) => d.selected ? fillColor : fadedColor)
      .attr('stroke', (d) => d.selected ? fillColor : fadedColor)
      .attr('stroke-width', '2')
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)

    barGroup.append('text')
      .attr('class', 'gradient-bar-text')
      .attr('x', (d) => x(d.label) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.value) + ((height - y(d.value)) / 2))
      .attr('dx', '.2em')
      .attr('dy', '.32em')
      .attr('text-anchor', 'middle')
      .text((d) => `${d.value}%`)
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)

    if (!isUpdate) {
      xAxisG.call(xAxis)
        .selectAll('text')
        .attr('class', 'gradient-bar-text')
        .attr('y', 17)
        .style('font-size', isMobile ? '.75rem' : '.875rem')
        .style('letter-spacing', '0.03em')
        .text(null)
        .tspans((d) => wordwrap(d, 18), 17)
        .style('opacity', 0)
        .transition(t)
        .style('opacity', 1)
    } else {
      xAxisG.call(xAxis)
        .selectAll('text')
        .attr('class', 'gradient-bar-text')
        .attr('y', 17)
        .style('font-size', isMobile ? '.75rem' : '.875rem')
        .style('letter-spacing', '0.03em')
        .text(null)
        .tspans((d) => wordwrap(d, 18), 17)
    }
  }

  function update (data) {
    render(data, true)
  }

  return {
    render,
  update}
}

export default BoxMaker
