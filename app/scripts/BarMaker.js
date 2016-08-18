import * as d3 from 'd3'
import checkIfMobile from './isMobile'

function BarMaker (containerEl, opts) {
  const fillColor = 'rgb(209, 70, 33)'

  const container = d3.select(containerEl)
  container.select('svg').remove()

  const sizing = container.node().parentNode.getBoundingClientRect()
  const isMobile = checkIfMobile()

  const margin = {
    top: isMobile ? 20 : sizing.height * 0.15,
    right: isMobile ? 60 : 80,
    bottom: isMobile ? 0 : sizing.height * 0.15,
    left: isMobile ? 160 : 200
  }

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  const svg = container.append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('shape-rendering', 'crispEdges')

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const x = d3.scaleLinear()
  const y = d3.scaleBand()

  const data = [
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

  x.domain([0, d3.max(data, (d) => d.amount)])
    .range([0, width])

  y.domain(data.map((d) => d.name))
    .range([0, height])
    .padding(isMobile ? 0.45 : 0.35)

  const yAxis = d3.axisLeft(y)

  const bars = g.selectAll('g')
  .data(data, (d) => d)
  .enter()
    .append('g')
    .attr('class', 'bar')
    .attr('transform', (d) => `translate(0, ${y(d.name)})`)

  bars.append('rect')
    .attr('width', (d) => x(d.amount))
    .attr('height', y.bandwidth())
    .attr('fill', fillColor)

  g.append('g').attr('class', 'labels').selectAll('text')
    .data(data, (d) => d)
    .enter()
      .append('text')
      .attr('x', (d) => x(d.amount))
      .attr('y', (d) => y(d.name) + y.bandwidth() * 0.5)
      .attr('dx', '.32em')
      .attr('dy', '.32em')
      .text((d) => d.amount)
      .style('font-size', isMobile ? '.75rem' : '1rem')

  g.append('g')
    .attr('class', 'x axis')
    .call(yAxis)
    .selectAll('text')
      .style('font-size', isMobile ? '.75rem' : '.875rem')
}

export default BarMaker
