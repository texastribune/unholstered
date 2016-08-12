import * as d3 from 'd3'
import isMobile from './isMobile'

export default function gridMaker (selection, params) {
  const x = d3.scaleBand()
  const y = d3.scaleBand()

  const cols = Math.ceil(Math.sqrt(params.total))
  const rows = Math.ceil(params.total / cols)

  const container = d3.select(selection)
  container.select('svg').remove()
  const sizing = container.node().parentNode.getBoundingClientRect()

  const [width, height] = [sizing.width, sizing.height]

  const padding = params.padding || 0.2

  x.domain(d3.range(cols))
    .range([0, width])
    .padding(padding)
    .paddingOuter(0)

  y.domain(d3.range(rows))
    .range([0, height])
    .padding(padding)
    .paddingOuter(0)

  const data = d3.range(params.total)

  const svg = container.append('svg')
    .attr('width', sizing.width)
    .attr('height', sizing.height)
    .attr('shape-rendering', 'crispEdges')
  const g = svg.append('g').attr('class', 'grid')

  const cells = g.selectAll('rect').data(data, (i) => i)

  // ENTER
  cells.enter().append('rect').attr('class', 'cell')
    .attr('x', (d) => x(d % cols))
    .attr('y', (d) => y(Math.floor(d / cols)))
    .attr('width', 0)
    .attr('height', 0)
    .attr('fill', 'lightgray')
    .transition().duration(0).delay(() => Math.random() * 1000)
    .attr('width', () => x.bandwidth())
    .attr('height', () => y.bandwidth())
}
