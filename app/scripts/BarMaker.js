import * as d3 from 'd3'
import checkIfMobile from './isMobile'

const barColors = {
  selected: d3.color('rgba(255, 97, 74, 1)'),
  unSelected: d3.color('rgba(255, 97, 74, 0.5)')
}

const textColors = {
  selected: d3.color('rgba(255, 255, 255, 1)'),
  unSelected: d3.color('rgba(255, 255, 255, 0.5)')
}

function BarMaker (container) {
  let svg, g
  const isMobile = checkIfMobile()

  const sizing = container.node().parentNode.getBoundingClientRect()

  const margin = {
    top: isMobile ? 20 : sizing.height * 0.15,
    right: isMobile ? 60 : 80,
    bottom: isMobile ? 30 : sizing.height * 0.15,
    left: isMobile ? 180 : 200
  }

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  const x = d3.scaleLinear().range([0, width])
  const y = d3.scaleBand().range([0, height]).padding(isMobile ? 0.4 : 0.3)
  const yAxis = d3.axisLeft(y)

  let hasBeenInitialized = false

  function init () {
    svg = container.append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('shape-rendering', 'crispEdges')

    g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    g.append('g')
      .attr('class', 'y axis bar-chart-axis')

    hasBeenInitialized = true
  }

  function render (data, isUpdate = false) {
    if (!hasBeenInitialized) init()

    x.domain([0, d3.max(data, (d) => d.value)])
    y.domain(data.map((d) => d.name))

    const t = d3.transition().duration(250)

    if (!isUpdate) {
      g.selectAll('.y.axis').call(yAxis)
        .selectAll('text')
          .attr('fill', (d) => textColors.selected)
          .style('font-size', isMobile ? '.75rem' : '.875rem')
          .style('letter-spacing', '0.03em')
          .style('opacity', 0)
          .transition(t)
          .style('opacity', 1)
    } else {
      g.selectAll('.y.axis').call(yAxis)
        .selectAll('text')
          .attr('fill', (d) => textColors.selected)
          .style('font-size', isMobile ? '.75rem' : '.875rem')
          .style('letter-spacing', '0.03em')
    }

    // JOIN
    const bars = g.selectAll('.bar').data(data, (d) => d.name)

    // UPDATE
    bars.selectAll('rect').data(data, (d) => d.name)
      .transition(t)
      .attr('fill', (d) => d.selected ? barColors.selected : barColors.unSelected)

    bars.selectAll('text').data(data, (d) => d.name)
      .transition(t)
      .attr('fill', (d) => d.selected ? textColors.selected : textColors.unSelected)

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
      .attr('dx', '.5em')
      .attr('dy', '.32em')
      .attr('fill', (d) => d.selected ? textColors.selected : textColors.unSelected)
      .text((d) => d.value)
      .style('font-size', isMobile ? '.75rem' : '1rem')
      .style('letter-spacing', '0.03em')
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)
  }

  function update (data) {
    render(data, true)
  }

  return {
    render,
    update
  }
}

export default BarMaker
