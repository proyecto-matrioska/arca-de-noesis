export const groupByTetrads = dualities => {
  const r = []
  for (let i = 0; i < dualities.length; i += 4) {
    r.push([
      dualities[i],
      i + 1 < dualities.length
        ? dualities[i + 1]
        : [
            ['', '', '', ''],
            ['', '', '', ''],
          ],
      i + 2 < dualities.length
        ? dualities[i + 2]
        : [
            ['', '', '', ''],
            ['', '', '', ''],
          ],
      i + 3 < dualities.length
        ? dualities[i + 3]
        : [
            ['', '', '', ''],
            ['', '', '', ''],
          ],
    ])
  }
  return r
}
