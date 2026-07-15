import { SchemaIdentifier } from '../schemas/schema'
import type { ExcalidrawViewport, TabState } from './dialecticsSlice'
import { CURRENT_VERSION, migrateToLatest } from './noesisFormat'
import { schemaOptions as defaultSchemaOptionsTree } from './uiOptions'

export type ShareEnvelopeV1 = {
  shareVersion: 1
  file: unknown
  selectedDiagram: SchemaIdentifier | null
  generalOptions: Record<string, unknown>
  schemaOptions: Record<string, unknown>
  excalidrawViewport: ExcalidrawViewport | null
}

export const SHARE_VERSION = 1
export const SHARE_PARAM = 'd'
export const VIEW_PARAM = 'view'

const validSchemaIdentifiers = new Set(Object.keys(defaultSchemaOptionsTree))

const optionValues = (
  options: Record<string, { value: unknown } | undefined> | undefined
): Record<string, unknown> => {
  const result: Record<string, unknown> = {}
  if (!options) return result
  for (const [optionId, option] of Object.entries(options)) {
    if (option) result[optionId] = option.value
  }
  return result
}

export const buildShareEnvelope = (tab: TabState): ShareEnvelopeV1 => ({
  shareVersion: SHARE_VERSION,
  file: { version: CURRENT_VERSION, entries: tab.entries },
  selectedDiagram: tab.selectedDiagram,
  generalOptions: optionValues(tab.generalOptions),
  schemaOptions: tab.selectedDiagram
    ? optionValues(tab.schemaOptions[tab.selectedDiagram])
    : {},
  excalidrawViewport: tab.excalidrawViewport,
})

const base64UrlEncode = (bytes: Uint8Array): string => {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

const base64UrlDecode = (value: string): Uint8Array => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  const binary = atob(padded + padding)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

export const encodeShareEnvelope = (envelope: ShareEnvelopeV1): string => {
  const json = JSON.stringify(envelope)
  return base64UrlEncode(new TextEncoder().encode(json))
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const decodeShareEnvelope = (param: string): ShareEnvelopeV1 | null => {
  try {
    const json = new TextDecoder().decode(base64UrlDecode(param))
    const raw = JSON.parse(json)
    if (!isPlainObject(raw) || raw.shareVersion !== SHARE_VERSION) return null

    // Validates the wrapped .noesis file shape and upgrades legacy versions.
    migrateToLatest(raw.file)

    const selectedDiagram =
      typeof raw.selectedDiagram === 'string' &&
      validSchemaIdentifiers.has(raw.selectedDiagram)
        ? (raw.selectedDiagram as SchemaIdentifier)
        : null

    const viewport = raw.excalidrawViewport
    const excalidrawViewport: ExcalidrawViewport | null =
      isPlainObject(viewport) &&
      typeof viewport.scrollX === 'number' &&
      typeof viewport.scrollY === 'number' &&
      typeof viewport.zoom === 'number'
        ? {
          scrollX: viewport.scrollX,
          scrollY: viewport.scrollY,
          zoom: viewport.zoom,
        }
        : null

    return {
      shareVersion: SHARE_VERSION,
      file: raw.file,
      selectedDiagram,
      generalOptions: isPlainObject(raw.generalOptions) ? raw.generalOptions : {},
      schemaOptions: isPlainObject(raw.schemaOptions) ? raw.schemaOptions : {},
      excalidrawViewport,
    }
  } catch (err) {
    console.warn('Invalid share link data, ignoring.', err)
    return null
  }
}

export const isViewerModeActive = (): boolean =>
  new URLSearchParams(window.location.search).get(VIEW_PARAM) === '1'

export const buildShareUrl = (
  envelope: ShareEnvelopeV1,
  { viewer }: { viewer: boolean }
): string => {
  const base = `${window.location.origin}${import.meta.env.BASE_URL}`
  const params = new URLSearchParams()
  params.set(SHARE_PARAM, encodeShareEnvelope(envelope))
  if (viewer) params.set(VIEW_PARAM, '1')
  return `${base}?${params.toString()}`
}

export const buildEmbedSnippet = (shareUrlWithView: string): string =>
  `<iframe src="${shareUrlWithView}" width="800" height="600" style="border:none;" loading="lazy" title="Arca de Noesis"></iframe>`

const applyOptionValues = (
  options: Record<string, { value: unknown } | undefined> | undefined,
  values: Record<string, unknown>
): void => {
  if (!options) return
  for (const [optionId, value] of Object.entries(values)) {
    const option = options[optionId]
    if (option) option.value = value
  }
}

// Applies a share envelope (if the URL carries one) directly onto a freshly
// created tab. Runs synchronously as part of the Redux store's initial state
// computation — this is the only way to have the correct diagram already
// present in Excalidraw's `initialData.elements` on first paint, since
// Excalidraw asynchronously re-applies `initialData` shortly after mount
// (racing with and clobbering any `updateScene` call made from a post-mount
// effect).
export const hydrateTabFromShareUrl = (tab: TabState): TabState => {
  const raw = new URLSearchParams(window.location.search).get(SHARE_PARAM)
  if (!raw) return tab

  const envelope = decodeShareEnvelope(raw)
  if (!envelope) return tab

  const { entries } = migrateToLatest(envelope.file)
  tab.entries = entries
  tab.selectedDiagram = envelope.selectedDiagram
  tab.excalidrawViewport = envelope.excalidrawViewport

  applyOptionValues(tab.generalOptions, envelope.generalOptions)
  if (envelope.selectedDiagram) {
    applyOptionValues(
      tab.schemaOptions[envelope.selectedDiagram],
      envelope.schemaOptions
    )
  }

  return tab
}
