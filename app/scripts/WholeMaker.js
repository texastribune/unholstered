import * as d3 from 'd3'
import checkIfMobile from './isMobile'

function WholeMaker (container, opts) {
  let svg, g, yAxisG
  const isMobile = checkIfMobile()

  const colorScale = opts.colorScale

  const sizing = container.node().parentNode.getBoundingClientRect()

  const margin = {
    top: isMobile ? 20 : sizing.height * 0.15,
    right: isMobile ? 80 : sizing.width * 0.2,
    bottom: isMobile ? 30 : sizing.height * 0.15,
    left: isMobile ? 80 : sizing.width * 0.25
  }

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  const y1 = d3.scaleLinear()

  let hasBeenInitialized = false

  function init () {
    svg = container.append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('shape-rendering', 'crispEdges')

    g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    yAxisG = g.append('g')
      .attr('class', 'y axis whole-chart-axis')
      .attr('transform', `translate(${width + 5}, 0)`)
      .style('opacity', 0)

    hasBeenInitialized = true
  }

  function render (data) {
    if (!hasBeenInitialized) init()

    data = prepareData(data)

    y1.domain([0, 100])
      .range([0, height])

    const yAxis = d3.axisRight(y1)
    yAxis.ticks(3).tickFormat((d) => `${d}%`)

    const bars = g.selectAll('.bar').data(data, (d) => d.label)

    const barsEnter = bars.enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', (d) => `translate(0, ${y1(d.offset)})`)

    const t = d3.transition().duration(250)

    barsEnter.append('rect')
      .attr('class', 'whole-bar')
      .attr('width', width)
      .attr('height', (d) => y1(d.value))
      .attr('fill', (d) => d.fillColor)
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)

    barsEnter.append('text')
      .attr('class', 'whole-bar-text')
      .attr('x', -13)
      .attr('y', (d) => y1(d.value) / 2)
      .attr('dx', '.32em')
      .attr('dy', '.32em')
      .attr('text-anchor', 'end')
      .text((d) => d.label)
      .style('font-size', isMobile ? '.75rem' : '1rem')
      .style('letter-spacing', '0.03em')
      .style('opacity', 0)
      .transition(t)
      .style('opacity', 1)

    yAxisG.transition(t)
      .call(yAxis)
      .style('opacity', 1)
  }

  function prepareData (data) {
    // get the grand total we are working with
    const total = data.reduce((prev, curr) => {
      prev += +curr.value
      return prev
    }, 0)

    let totalOffset = 0

    return data.map((d, i) => {
      const value = (d.value / total) * 100

      const processed = {
        label: d.label,
        value: value,
        offset: totalOffset,
        fillColor: colorScale[i]
      }

      totalOffset += value

      return processed
    })
  }

  return {
    render
  }
}

export default WholeMaker
