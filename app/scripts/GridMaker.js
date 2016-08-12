import * as d3 from 'd3'

export default function GridMaker (selection, params) {
  const el = d3.select(selection)
  const s = 20
  const width = params.x * s
  const height = params.y * s
  const padding = 0.35

  el.select('svg').remove()

  const x = d3.scaleBand()
    .domain(d3.range(params.x))
    .rangeRound([0, width])
    .padding(padding)
    .paddingOuter(0)

  const elWidth = el.node().clientWidth
  const elHeight = Math.round(elWidth * (height / width))

  const svg = el.append('svg')
    .attr('width', elWidth)
    .attr('height', elHeight)
    .attr('viewBox', `0 0 ${width} ${height}`)

  const g = svg.append('g')

  const data = d3.range(params.total)

  // JOIN
  const cells = g.selectAll('rect').data(data, (i) => i)

  // ENTER
  cells.enter().append('rect')
    .attr('x', (d) => x(d % params.x))
    .attr('y', (d) => Math.floor(d / params.x) * x.step())
    .attr('width', x.bandwidth)
    .attr('height', x.bandwidth)
    .attr('fill', 'tomato')
}
