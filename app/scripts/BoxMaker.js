import * as d3 from 'd3'
import checkIfMobile from './isMobile'

function BoxMaker (container) {
  let svg, g, xAxisG
  const isMobile = checkIfMobile()

  const fillColor = 'rgba(255, 97, 74, 1)'
  // const fadedColor = 'rgba(255, 97, 74, 0.5)'

  const sizing = container.node().parentNode.getBoundingClientRect()

  const margin = {
    top: isMobile ? 20 : sizing.height * 0.15,
    right: 40,
    bottom: isMobile ? 50 : sizing.height * 0.15,
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

  function render (data) {
    if (!hasBeenInitialized) init()

    x.domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.1)
      .paddingOuter(0)

    y.domain([0, 100])
      .range([height, 0])

    const xAxis = d3.axisBottom(x)

    const bars = g.selectAll('rect').data(data, (d) => d.label)

    const barsGroup = bars.enter().append('g').attr('class', 'gradient-bar')

    const t = d3.transition().duration(250)

    barsGroup.append('rect')
      .attr('x', (d) => x(d.label))
      .attr('y', 0)
      .attr('width', x.bandwidth)
      .attr('height', height)
      .attr('fill', 'url(#diagonal)')
      .attr('stroke', fillColor)
      .attr('stroke-width', '2')
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)

    const barGroup = barsGroup.append('g')

    barGroup.append('rect')
      .attr('x', (d) => x(d.label))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth)
      .attr('height', (d) => height - y(d.value))
      .attr('fill', fillColor)
      .attr('stroke', fillColor)
      .attr('stroke-width', '2')
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)

    barGroup.append('text')
      .attr('class', 'gradient-bar-text')
      .attr('x', (d) => x(d.label) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.value) + ((height - y(d.value)) / 2))
      .attr('dx', '.32em')
      .attr('dy', '.32em')
      .attr('text-anchor', 'middle')
      .text((d) => `${d.value}%`)
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)

    xAxisG.call(xAxis)
      .selectAll('text')
        .attr('class', 'gradient-bar-text')
        .style('font-size', isMobile ? '.75rem' : '.875rem')
        .style('letter-spacing', '0.03em')
        .style('opacity', 0)
        .transition(t)
        .style('opacity', 1)
  }

  return {
    render
  }
}

export default BoxMaker
