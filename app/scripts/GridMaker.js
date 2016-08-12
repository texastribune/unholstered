import * as d3 from 'd3'

export default function gridMaker (selection) {
  const container = d3.select(selection)
  const svg = container.append('svg')
  const g = svg.append('g').attr('class', 'grid')
    .attr('transform', 'translate(20, 20)')

  function render (params) {
    container.style('display', 'block')
    const x = d3.scaleBand()
    const y = d3.scaleBand()

    const cols = Math.ceil(Math.sqrt(params.total))
    const rows = Math.ceil(params.total / cols)

    const sizing = container.node().parentNode.getBoundingClientRect()

    const [width, height] = [sizing.width - 20 * 2, sizing.height - 20 * 2]

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

    svg
      .attr('width', sizing.width)
      .attr('height', sizing.height)
      .attr('shape-rendering', 'crispEdges')

    // JOIN
    const cells = g.selectAll('rect').data(data, (i) => i)

    // EXIT
    cells.exit()
      .transition()
      .duration(0)
      .delay(() => Math.random() * 1250)
      .style('fill-opacity', 1e-6)
      .remove()

    // UPDATE
    cells
      .attr('class', 'cell')
      .attr('fill', (d) => d < params.subset ? 'rgb(209, 70, 33)' : 'rgba(209, 70, 33, 0.3)')
      .transition()
      .duration(500)
      .delay(() => Math.random() * 1250)
      .attr('x', (d) => x(d % cols))
      .attr('y', (d) => y(Math.floor(d / cols)))
      .attr('width', () => x.bandwidth())
      .attr('height', () => y.bandwidth())

    // ENTER
    cells.enter().append('rect').attr('class', 'cell')
      .attr('x', (d) => x(d % cols))
      .attr('y', (d) => y(Math.floor(d / cols)))
      .attr('width', 0)
      .attr('height', 0)
      .attr('fill', (d) => d < params.subset ? 'rgb(209, 70, 33)' : 'rgba(209, 70, 33, 0.3)')
      .transition().duration(0).delay(() => Math.random() * 625)
        .attr('width', () => x.bandwidth())
        .attr('height', () => y.bandwidth())
  }

  function hide () {
    container.style('display', 'none')
  }

  return {
    render,
    hide
  }
}
