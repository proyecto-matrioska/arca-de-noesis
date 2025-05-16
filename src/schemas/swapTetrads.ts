import { DialecticsDataEntry } from '../state/dialecticsSlice'

export const swapTetrads: (d: DialecticsDataEntry) => DialecticsDataEntry = ([
  x,
  y,
]) => [y, x]
