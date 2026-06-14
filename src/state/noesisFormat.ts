import { DialecticsDataEntry } from '../schemas/schema'

export type NoesisEntry = {
  data: DialecticsDataEntry
  annotations: [string, string]
}

export type NoesisFileV2 = {
  version: 2
  entries: NoesisEntry[]
}

export const CURRENT_VERSION = 2

const emptyEntry = (): NoesisEntry => ({
  data: [
    ['', '', '', ''],
    ['', '', '', ''],
  ],
  annotations: ['', ''],
})

export const emptyEntries = (): NoesisEntry[] => [emptyEntry()]

// Add migration functions here each time the version increments.
// Each function transforms vN data into vN+1 data.
const migrations: Record<number, (raw: unknown) => NoesisFileV2> = {
  1: (raw: unknown): NoesisFileV2 => ({
    version: 2,
    entries: (raw as DialecticsDataEntry[]).map(data => ({
      data,
      annotations: ['', ''],
    })),
  }),
}

export function migrateToLatest(raw: unknown): NoesisFileV2 {
  let version = Array.isArray(raw) ? 1 : ((raw as NoesisFileV2).version ?? 1)
  let data: unknown = raw
  while (version < CURRENT_VERSION) {
    data = migrations[version](data)
    version++
  }
  return data as NoesisFileV2
}
