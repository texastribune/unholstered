import * as d3 from 'd3'

var graphic = d3.select('.graphic')
var width = graphic.node().clientWidth

var totalCells = 652
var selectedCells = 116
var cellsPerRow = 25
var padding = 0.05
var data = d3.range(totalCells)

var x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(padding)

var svg = graphic.append('svg').attr('width', width)
var g = svg.append('g')

function render (d, rowTotal) {
  if (rowTotal) cellsPerRow = rowTotal
  x.domain(d3.range(cellsPerRow))

  // TRANSITION
  var t = d3.transition().duration(500).ease(d3.easeQuad)

  // JOIN
  var cells = g.selectAll('rect').data(d, function (i) { return i })

  // EXIT
  cells.exit()
    .transition(t)
    .duration(1500)
    .style('fill-opacity', 1e-6)
    .remove()
    .on('end', update)

  // UPDATE
  function update () {
    cells.transition(t).delay(function (d) { return d * 10 * Math.random() })
      // .attrTween('transform', function() { return d3.interpolateString('rotate(0)', 'rotate(360)')})
      .attr('x', function (d) { return x(d % cellsPerRow) })
      .attr('y', function (d) { return Math.floor(d / cellsPerRow) * x.step() })
      .attr('width', x.bandwidth)
      .attr('height', x.bandwidth)
      .attr('fill', function (d) {
        return d <= 48 ? 'tomato' : 'lightsalmon'
      })
  }

  // ENTER
  cells.enter().append('rect')
    .attr('x', function (d) { return x(d % cellsPerRow) })
    .attr('y', function (d) { return Math.floor(d / cellsPerRow) * x.step() })
    .attr('width', x.bandwidth)
    .attr('height', x.bandwidth)
    .attr('rx', 2)
    .attr('ry', 2)
    .attr('fill', 'lightgray')
    .filter(function (d) { return d <= selectedCells })
    .transition(t).delay(function (d) { return d * 5 })
    .attr('fill', 'tomato')
    .on('end', function () {
      // SET SVG HEIGHT
      svg.attr('height', x.step() * (Math.ceil(d.length / cellsPerRow)))
    })
}

render(data)

d3.timeout(function () {
  render(data.slice(0, selectedCells + 1), 11)
}, 3000)
