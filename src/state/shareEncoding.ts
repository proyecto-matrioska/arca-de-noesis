import { SchemaIdentifier } from '../schemas/schema'
import type { ExcalidrawViewport, TabState } from './dialecticsSlice'
import { CURRENT_VERSION, migrateToLatest } from './noesisFormat'
import { schemaOptions as defaultSchemaOptionsTree } from './uiOptions'

// The scene-space rectangle that was visible on the sharer's screen —
// device/display-independent, unlike raw scrollX/scrollY/zoom. On load, this
// is fitted to the *receiver's* actual viewport size (see fitBoundsToViewport)
// so the same framing is visible regardless of window/screen size.
export type SharedViewportBounds = {
  x1: number
  y1: number
  x2: number
  y2: number
}

export type ShareEnvelopeV1 = {
  shareVersion: 1
  file: unknown
  selectedDiagram: SchemaIdentifier | null
  generalOptions: Record<string, unknown>
  schemaOptions: Record<string, unknown>
  viewportBounds: SharedViewportBounds | null
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

export const buildShareEnvelope = (
  tab: TabState,
  viewportBounds: SharedViewportBounds | null
): ShareEnvelopeV1 => ({
  shareVersion: SHARE_VERSION,
  file: { version: CURRENT_VERSION, entries: tab.entries },
  selectedDiagram: tab.selectedDiagram,
  generalOptions: optionValues(tab.generalOptions),
  schemaOptions: tab.selectedDiagram
    ? optionValues(tab.schemaOptions[tab.selectedDiagram])
    : {},
  viewportBounds,
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

    const bounds = raw.viewportBounds
    const viewportBounds: SharedViewportBounds | null =
      isPlainObject(bounds) &&
      typeof bounds.x1 === 'number' &&
      typeof bounds.y1 === 'number' &&
      typeof bounds.x2 === 'number' &&
      typeof bounds.y2 === 'number' &&
      bounds.x2 > bounds.x1 &&
      bounds.y2 > bounds.y1
        ? { x1: bounds.x1, y1: bounds.y1, x2: bounds.x2, y2: bounds.y2 }
        : null

    return {
      shareVersion: SHARE_VERSION,
      file: raw.file,
      selectedDiagram,
      generalOptions: isPlainObject(raw.generalOptions) ? raw.generalOptions : {},
      schemaOptions: isPlainObject(raw.schemaOptions) ? raw.schemaOptions : {},
      viewportBounds,
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

const MIN_FIT_ZOOM = 0.1
const MAX_FIT_ZOOM = 10

// Computes the scrollX/scrollY/zoom that fits `bounds` (a scene-space
// rectangle captured on the sharer's screen) entirely within a viewport of
// the given size — "contain" semantics, so nothing from the shared framing
// is cropped, whether the receiver's window is a phone or a wide desktop
// (some extra margin may show on one axis instead). Inverse of Excalidraw's
// own scene/viewport transform: client = (scene + scroll) * zoom.
const fitBoundsToViewport = (
  bounds: SharedViewportBounds,
  viewportWidth: number,
  viewportHeight: number
): ExcalidrawViewport => {
  const boundsWidth = Math.max(bounds.x2 - bounds.x1, 1)
  const boundsHeight = Math.max(bounds.y2 - bounds.y1, 1)
  const zoom = Math.min(
    MAX_FIT_ZOOM,
    Math.max(
      MIN_FIT_ZOOM,
      Math.min(viewportWidth / boundsWidth, viewportHeight / boundsHeight)
    )
  )
  const centerX = (bounds.x1 + bounds.x2) / 2
  const centerY = (bounds.y1 + bounds.y2) / 2
  return {
    zoom,
    scrollX: viewportWidth / (2 * zoom) - centerX,
    scrollY: viewportHeight / (2 * zoom) - centerY,
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
  tab.excalidrawViewport = envelope.viewportBounds
    ? fitBoundsToViewport(
      envelope.viewportBounds,
      window.innerWidth,
      window.innerHeight
    )
    : null

  applyOptionValues(tab.generalOptions, envelope.generalOptions)
  if (envelope.selectedDiagram) {
    applyOptionValues(
      tab.schemaOptions[envelope.selectedDiagram],
      envelope.schemaOptions
    )
  }

  return tab
}
