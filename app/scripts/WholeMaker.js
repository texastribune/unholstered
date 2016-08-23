import * as d3 from 'd3'
import checkIfMobile from './isMobile'

function WholeMaker (container) {
  let svg, g
  const isMobile = checkIfMobile()

  const sizing = container.node().parentNode.getBoundingClientRect()

  const margin = {
    top: isMobile ? 20 : sizing.height * 0.1,
    right: 60,
    bottom: isMobile ? 40 : sizing.height * 0.1,
    left: isMobile ? 80 : 100
  }

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  const y = d3.scaleLinear()

  let hasBeenInitialized = false

  function init () {
    svg = container.append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('shape-rendering', 'crispEdges')

    g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    hasBeenInitialized = true
  }

  function render (data) {
    if (!hasBeenInitialized) init()

    data = prepareData(data)

    y.domain([0, 100])
      .range([0, height])

    const bars = g.selectAll('.bar').data(data, (d) => d.label)

    const barsEnter = bars.enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', (d) => `translate(0, ${y(d.offset)})`)

    barsEnter.append('rect')
      .attr('class', 'whole-bar')
      .attr('width', width)
      .attr('height', (d) => y(d.value))
      .attr('fill', () => '#' + Math.floor(Math.random() * 16777215).toString(16))

    barsEnter.append('text')
      .attr('class', 'whole-bar-text')
      .attr('x', -9)
      .attr('y', (d) => y(d.value) / 2)
      .attr('dx', '.32em')
      .attr('dy', '.32em')
      .attr('text-anchor', 'end')
      .text((d) => d.label)
      .style('font-size', isMobile ? '.75rem' : '1rem')
      .style('letter-spacing', '0.03em')

    // barsGroup.append('rect')
    //   .attr('x', (d) => x(d.label))
    //   .attr('y', (d) => y(d.value))
    //   .attr('width', x.bandwidth)
    //   .attr('height', (d) => height - y(d.value))
    //   .attr('fill', fillColor)
    //   .attr('stroke', fillColor)
    //   .attr('stroke-width', '2')
    //
    // barsGroup.append('text')
    //   .attr('class', 'gradient-bar-text')
    //   .attr('x', (d) => x(d.label) + x.bandwidth() / 2)
    //   .attr('y', (d) => y(d.value) + ((height - y(d.value)) / 2))
    //   .attr('dx', '.32em')
    //   .attr('dy', '.32em')
    //   .attr('text-anchor', 'middle')
    //   .text((d) => `${d.value}%`)

    // xAxisG.call(xAxis)
    //   .selectAll('text')
    //     .attr('fill', fillColor)
    //     .style('font-size', isMobile ? '.75rem' : '.875rem')
    //     .style('letter-spacing', '0.03em')
  }

  function prepareData (data) {
    // get the grand total we are working with
    const total = data.reduce((prev, curr) => {
      prev += +curr.value
      return prev
    }, 0)

    let totalOffset = 0

    return data.map((d) => {
      const value = (d.value / total) * 100

      const processed = {
        label: d.label,
        value: value,
        offset: totalOffset
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
