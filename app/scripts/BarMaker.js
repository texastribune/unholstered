import * as d3 from 'd3'
import checkIfMobile from './isMobile'

const DATA = [
  {
    name: 'Robbery',
    amount: 65
  }, {
    name: 'Burglary',
    amount: 62
  }, {
    name: 'Shots Fired',
    amount: 58
  }, {
    name: 'Domestic Disturbance',
    amount: 51
  }, {
    name: 'Traffic Stop',
    amount: 48
  }, {
    name: 'Suspicious Activity',
    amount: 44
  }, {
    name: 'Weapons Disturbance',
    amount: 43
  }, {
    name: 'Theft',
    amount: 36
  }, {
    name: 'Mental Crisis',
    amount: 35
  }, {
    name: 'Drug Warrant',
    amount: 27
  }, {
    name: 'Assault',
    amount: 25
  }, {
    name: 'Disorderly Conduct',
    amount: 19
  }, {
    name: 'Other/Unknown',
    amount: 139
  }
]

const barColors = {
  selected: d3.color('rgba(224, 173, 43, 1)'),
  unSelected: d3.color('rgba(224, 173, 43, 0.5)')
}

const textColors = {
  selected: d3.color('rgba(255, 255, 255, 1)'),
  unSelected: d3.color('rgba(255, 255, 255, 0.5)')
}

function BarMaker (containerEl) {
  let svg, g, yAxisG
  let _isInitialized = false
  const container = d3.select(containerEl)
  const isMobile = checkIfMobile()

  const sizing = container.node().parentNode.getBoundingClientRect()

  const margin = {
    top: isMobile ? 20 : sizing.height * 0.15,
    right: isMobile ? 60 : 80,
    bottom: isMobile ? 20 : sizing.height * 0.15,
    left: isMobile ? 160 : 200
  }

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  const x = d3.scaleLinear()
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

    yAxisG = g.append('g').attr('class', 'y axis')

    _isInitialized = true
  }

  function render (slideIndex) {
    if (!isInitialized()) init()

    const data = DATA.map((d) => {
      d.selected = false

      if (slideIndex === 5) d.selected = true
      if (slideIndex === 6 && d.name === 'Robbery') d.selected = true
      if (slideIndex === 7 && d.name === 'Mental Crisis') d.selected = true

      return d
    })

    x.domain([0, d3.max(data, (d) => d.amount)])
      .range([0, width])

    y.domain(data.map((d) => d.name))
      .range([0, height])
      .padding(isMobile ? 0.4 : 0.3)

    const yAxis = d3.axisLeft(y)

    // JOIN
    const bars = g.selectAll('.bar').data(data, (d) => d.name)

    // UPDATE
    const t = d3.transition().duration(500)

    bars.selectAll('rect').transition(t)
      .attr('fill', (d) => d.selected ? barColors.selected : barColors.unSelected)

    bars.selectAll('text').transition(t)
      .attr('fill', (d) => d.selected ? textColors.selected : textColors.unSelected)

    // ENTER
    const barsEnter = bars.enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', (d) => `translate(0, ${y(d.name)})`)

    barsEnter.append('rect')
      .attr('width', (d) => x(d.amount))
      .attr('height', y.bandwidth())
      .attr('fill', (d) => d.selected ? barColors.selected : barColors.unSelected)

    barsEnter.append('text')
      .attr('class', 'label')
      .attr('x', (d) => x(d.amount))
      .attr('y', (d) => y.bandwidth() / 2)
      .attr('dx', '.32em')
      .attr('dy', '.32em')
      .attr('fill', (d) => d.selected ? textColors.selected : textColors.unSelected)
      .text((d) => d.amount)
      .style('font-size', isMobile ? '.75rem' : '1rem')
      .style('letter-spacing', '0.03em')

    yAxisG.call(yAxis)
      .selectAll('text')
        .attr('fill', textColors.selected)
        .style('font-size', isMobile ? '.75rem' : '.875rem')
        .style('letter-spacing', '0.03em')
  }

  function remove () {
    container.select('svg').transition().duration(125).style('opacity', 1e-6).remove()
    _isInitialized = false
  }

  function type () {
    return 'bar'
  }

  return {
    init,
    isInitialized,
    remove,
    render,
    type
  }
}

export default BarMaker
