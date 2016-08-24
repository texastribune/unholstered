import * as d3 from 'd3'
import checkIfMobile from './isMobile'

const barColors = {
  selected: d3.color('rgba(224, 173, 43, 1)'),
  unSelected: d3.color('rgba(224, 173, 43, 0.5)')
}

const textColors = {
  selected: d3.color('rgba(255, 255, 255, 1)'),
  unSelected: d3.color('rgba(255, 255, 255, 0.5)')
}

function BarMaker (container) {
  let svg, g, yAxisG
  const isMobile = checkIfMobile()

  const sizing = container.node().parentNode.getBoundingClientRect()

  const margin = {
    top: isMobile ? 20 : sizing.height * 0.15,
    right: isMobile ? 60 : 80,
    bottom: isMobile ? 40 : sizing.height * 0.15,
    left: isMobile ? 160 : 200
  }

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  const x = d3.scaleLinear()
  const y = d3.scaleBand()

  let hasBeenInitialized = false

  function init () {
    svg = container.append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('shape-rendering', 'crispEdges')

    g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    yAxisG = g.append('g').attr('class', 'y axis bar-chart-axis')

    hasBeenInitialized = true
  }

  function render (data) {
    if (!hasBeenInitialized) init()

    x.domain([0, d3.max(data, (d) => d.value)])
      .range([0, width])

    y.domain(data.map((d) => d.name))
      .range([0, height])
      .padding(isMobile ? 0.4 : 0.3)

    const yAxis = d3.axisLeft(y)

    // JOIN
    const bars = g.selectAll('.bar').data(data, (d) => d.name)

    bars.selectAll('rect')
      .attr('fill', (d) => d.selected ? barColors.selected : barColors.unSelected)

    bars.selectAll('text')
      .attr('fill', (d) => d.selected ? textColors.selected : textColors.unSelected)

    const t = d3.transition().duration(250)

    // ENTER
    const barsEnter = bars.enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', (d) => `translate(0, ${y(d.name)})`)

    barsEnter.append('rect')
      .attr('width', (d) => x(d.value))
      .attr('height', y.bandwidth())
      .attr('fill', (d) => d.selected ? barColors.selected : barColors.unSelected)
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)

    barsEnter.append('text')
      .attr('class', 'label')
      .attr('x', (d) => x(d.value))
      .attr('y', (d) => y.bandwidth() / 2)
      .attr('dx', '.32em')
      .attr('dy', '.32em')
      .attr('fill', (d) => d.selected ? textColors.selected : textColors.unSelected)
      .text((d) => d.value)
      .style('font-size', isMobile ? '.75rem' : '1rem')
      .style('letter-spacing', '0.03em')
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)

    yAxisG.call(yAxis)
      .selectAll('text')
        .attr('fill', textColors.selected)
        .style('font-size', isMobile ? '.75rem' : '.875rem')
        .style('letter-spacing', '0.03em')
  }

  return {
    render
  }
}

export default BarMaker
