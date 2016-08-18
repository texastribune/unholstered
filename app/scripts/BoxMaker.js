import * as d3 from 'd3'
import checkIfMobile from './isMobile'

function BoxMaker (containerEl, opts) {
  const fillColor = 'rgb(209, 70, 33)'
  const x = d3.scaleBand()
  const y = d3.scaleLinear()

  const container = d3.select(containerEl)
  container.select('svg').remove()

  const sizing = container.node().parentNode.getBoundingClientRect()
  const isMobile = checkIfMobile()

  const margin = {
    top: isMobile ? 40 : sizing.height * 0.15,
    right: 20,
    bottom: isMobile ? 20 : sizing.height * 0.15,
    left: 20
  }

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  x.domain([0, 1])
    .range([0, width])
    .padding(0.1)
    .paddingOuter(0)

  y.domain([0, 100])
    .range([height, 0])

  const svg = container.append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('shape-rendering', 'crispEdges')

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const bars = g.selectAll('rect').data([41, 14], (i) => i)

  const barsGroup = bars.enter().append('g')

  barsGroup.append('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', 0)
    .attr('width', x.bandwidth)
    .attr('height', height)
    .attr('fill', 'url(#diagonal)')
    .attr('stroke', fillColor)
    .attr('stroke-width', '2')

  barsGroup.append('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', (d) => y(d))
    .attr('width', x.bandwidth)
    .attr('height', (d) => height - y(d))
    .attr('fill', fillColor)
    .attr('stroke', fillColor)
    .attr('stroke-width', '2')

  barsGroup.append('text')
    .attr()
}

export default BoxMaker
