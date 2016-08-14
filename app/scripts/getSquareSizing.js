/**
 * Calculates the optimal length of each of `n` squares to fill an `x` by `y`
 * container.
 *
 * Source: http://math.stackexchange.com/a/466248
 *
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Number} n
 * @return {Number}
 */
function getSquareSizing (x, y, n) {
  const xByY = x / y
  const yByX = y / x

  const px = Math.ceil(Math.sqrt(xByY * n))
  const pxByYByX = px * yByX
  const sx = Math.floor(pxByYByX) * px < n ? y / Math.ceil(pxByYByX) : x / px

  const py = Math.ceil(Math.sqrt(yByX * n))
  const pyByXByY = py * xByY
  const sy = Math.floor(pyByXByY) * py < n ? x / Math.ceil(pyByXByY) : y / py

  return Math.max(sx, sy)
}

export default getSquareSizing
