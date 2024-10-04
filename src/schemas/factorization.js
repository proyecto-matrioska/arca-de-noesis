const rectagularIndexes = name => {
  switch (name) {
    case 'rectangular-1':
      return [0, 0, 0, 0]
    case 'rectangular-2':
      return [1, 1, 1, 1]
    case 'rectangular-3':
      return [2, 2, 2, 2]
    case 'rectangular-4':
      return [3, 3, 3, 3]
    case 'rectangular-5':
      return [1, 0, 0, 1]
    case 'rectangular-6':
      return [2, 3, 3, 2]
    case 'rectangular-7':
      return [0, 1, 2, 3]
    case 'rectangular-8':
      return [2, 3, 0, 1]
    case 'rectangular-9':
      return [3, 3, 0, 0]
    case 'rectangular-10':
      return [2, 2, 1, 1]
    case 'trapecial-1':
      return [1, 0, 1, 0]
    case 'trapecial-2':
      return [2, 3, 2, 3]
    case 'trapecial-3':
      return [0, 1, 0, 1]
    case 'trapecial-4':
      return [3, 2, 3, 2]
    case 'trapecial-5':
      return [0, 3, 0, 3]
    case 'trapecial-6':
      return [1, 2, 1, 2]
    case 'trapecial-7':
      return [3, 0, 3, 0]
    case 'trapecial-8':
      return [2, 1, 2, 1]
    case 'trapecial-9':
      return [1, 3, 0, 2]
    case 'trapecial-10':
      return [2, 0, 3, 1]
    default:
      return [0, 0, 0, 0]
  }
}

export const factorData = (factorizationId, data) => {
  if ([undefined, null, 'ninguna'].includes(factorizationId)) return data
  const r = []
  const indexes = rectagularIndexes(factorizationId)
  const aIdx = indexes[2] < 2 ? indexes[2] + 2 : indexes[2] - 2
  const bIdx = indexes[3] < 2 ? indexes[3] + 2 : indexes[3] - 2
  const cIdx = indexes[0] < 2 ? indexes[0] + 2 : indexes[0] - 2
  const dIdx = indexes[1] < 2 ? indexes[1] + 2 : indexes[1] - 2
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i]
    const b = data[i + 1]
      ? data[i + 1]
      : [
          ['', '', '', ''],
          ['', '', '', ''],
        ]
    const c = data[i + 2]
      ? data[i + 2]
      : [
          ['', '', '', ''],
          ['', '', '', ''],
        ]
    const d = data[i + 3]
      ? data[i + 3]
      : [
          ['', '', '', ''],
          ['', '', '', ''],
        ]
    r.push([
      [a[0][aIdx], b[0][bIdx], c[0][cIdx], d[0][dIdx]],
      [a[1][aIdx], b[1][bIdx], c[1][cIdx], d[1][dIdx]],
    ])
  }
  return r
}
