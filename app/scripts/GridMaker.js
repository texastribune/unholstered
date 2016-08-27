import * as d3 from 'd3'
import checkIfMobile from './isMobile'
import getSquareSizing from './getSquareSizing'

function GridMaker (container, opts) {
  let svg, g, rectsGroup, labelsGroup, gLabel
  const isMobile = checkIfMobile()

  const colorScale = opts.colorScale || { base: d3.color('rgba(204, 186, 165, 1)'), scale: [] }

  const margin = {
    top: isMobile ? 40 : 60,
    right: isMobile ? 30 : 40,
    bottom: isMobile ? 30 : 60 + opts.extraMarginBottom,
    left: isMobile ? 30 : 40
  }

  const labelPadding = 3

  const sizing = container.node().parentNode.getBoundingClientRect()

  const width = sizing.width - margin.right - margin.left
  const height = sizing.height - margin.top - margin.bottom

  const x = d3.scaleBand()
  const y = d3.scaleBand()

  let hasBeenInitialized = false

  function init () {
    svg = container.append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .attr('shape-rendering', 'crispEdges')

    g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    rectsGroup = g.append('g')

    labelsGroup = g.append('g')
      .attr('class', 'chart-section-labels')

    gLabel = container.append('div')
      .attr('class', 'chart-label')
      .style('padding', `0 ${margin.right}px 0 ${margin.left}px`)
      .style('opacity', 0)

    hasBeenInitialized = true
  }

  function render (data) {
    if (!hasBeenInitialized) init()

    const sectionLabelData = preprocessLabelData(data)
    data = preprocessData(data)

    const transitionTime = 500
    const sideLength = getSquareSizing(width, height, data.length)

    const cols = Math.round(width / sideLength)
    const rows = Math.round(height / sideLength)

    const padding = 0.25

    x.domain(d3.range(cols))
      .range([0, width])
      .padding(padding)
      .paddingOuter(0)

    y.domain(d3.range(rows))
      .range([0, height])
      .padding(padding)
      .paddingOuter(0)

    const xWidth = x.bandwidth()
    const yWidth = y.bandwidth()

    // JOIN
    const cells = rectsGroup.selectAll('rect').data(data)

    // EXIT
    cells.exit()
      .transition()
      .duration(transitionTime)
      .style('fill-opacity', 1e-6)
      .remove()

    // UPDATE
    cells.transition('update')
      .duration(transitionTime)
      .attr('fill', (d) => d.fillColor)

    // ENTER
    cells.enter().append('rect').attr('class', 'cell')
      .attr('x', (d, i) => x(i % cols))
      .attr('y', (d, i) => y(Math.floor(i / cols)))
      .attr('fill', (d) => d.fillColor)
      .transition('enter')
        .duration(0)
        .delay((d, i) => Math.random() * transitionTime)
        .delay((d, i) => i * 2)
        .attr('width', xWidth)
        .attr('height', yWidth)

    // LABELS JOIN
    const labels = labelsGroup.selectAll('.label-group').data(sectionLabelData, (d) => d.label)

    // LABELS EXIT
    labels.exit()
      .transition()
      .duration(transitionTime)
      .style('fill-opacity', 1e-6)
      .remove()

    // LABELS ENTER
    const labelsEnter = labels.enter()
      .append('g')
      .attr('class', 'label-group')

    labelsEnter.append('text')
      .attr('class', 'grid-label')
      .attr('x', width / 2)
      .attr('y', (d) => y(Math.floor(d.value / cols)) / 2 + y(Math.floor(d.offset / cols)))
      .attr('dx', '.05em')
      .attr('dy', '.85em')
      .attr('text-anchor', 'middle')
      .text((d) => `${d.value} ${d.label}`)
      .transition()
      .duration(750 + transitionTime)

    labelsEnter.each(function () {
      const sel = d3.select(this)
      const dims = sel.select('text').node().getBBox()

      sel.insert('rect', 'text')
        .attr('class', 'grid-label-background')
        .attr('x', dims.x - labelPadding)
        .attr('y', dims.y - labelPadding)
        .attr('width', dims.width + labelPadding * 2)
        .attr('height', dims.height + labelPadding * 2)
    })

    gLabel.text(`${data.length} total ${opts.label}`)

    gLabel.style(isMobile ? 'top' : 'bottom', `${margin.bottom * 0.5}px`)
      .transition()
      .duration(750 + transitionTime)
      .style('opacity', 1)
  }

  function preprocessData (data) {
    data = data.map((d, i) => {
      let fillColor

      if (data.length === 1) {
        fillColor = colorScale.base
      } else {
        fillColor = d.selected ? colorScale.scale[i] || colorScale.offBase : colorScale.offBase
      }

      return d3.range(d.value).map((v) => {
        return { fillColor }
      })
    })

    return d3.merge(data)
  }

  function preprocessLabelData (data) {
    const activeLabels = data.filter((d) => d.labeled)

    if (!activeLabels) return []

    let offset = 0

    return activeLabels.map((d) => {
      d.offset = offset
      offset += d.value

      return d
    })
  }

  return {
    init,
    render
  }
}

export default GridMaker
