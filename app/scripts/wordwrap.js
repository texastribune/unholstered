function wordwrap (line, maxChars = 40) {
  const w = line.split(' ')
  const lines = []
  const words = []
  let l = 0

  w.forEach((d) => {
    if (l + d.length > maxChars) {
      lines.push(words.join(' '))
      words.length = 0
      l = 0
    }
    l += d.length
    words.push(d)
  })

  if (words.length) {
    lines.push(words.join(' '))
  }

  return lines
}

export default wordwrap
