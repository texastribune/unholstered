export default function getSquareSizing (x, y, n) {
  const px = Math.ceil(Math.sqrt(x / y * n))
  const sx = Math.floor(px * y / x) * px < n ? y / Math.ceil(px * y / x) : x / px

  const py = Math.ceil(Math.sqrt(y / x * n))
  const sy = Math.floor(py * x / y) * py < n ? x / Math.ceil(x * py / y) : y / py

  return Math.max(sx, sy)
}
