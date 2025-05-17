import { DialecticsDataEntry } from './schema'

export const swapTetrads: (d: DialecticsDataEntry) => DialecticsDataEntry = ([
  x,
  y,
]) => [y, x]
