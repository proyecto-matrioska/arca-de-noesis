import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { viewportCoordsToSceneCoords } from '@excalidraw/excalidraw'
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/dist/types/excalidraw/types'
import Modal from './Modal'
import { useAppSelector } from '../state/store'
import { selectActiveTab } from '../state/dialecticsSlice'
import {
  buildEmbedSnippet,
  buildShareEnvelope,
  buildShareUrl,
  SharedViewportBounds,
} from '../state/shareEncoding'
import './ShareDialog.css'

const buttonClasses =
  'ExcButton ExcButton--color-primary ExcButton--variant-filled ExcButton--size-small'

interface ShareDialogProps {
  onClose: () => void
  excalidrawAPI: ExcalidrawImperativeAPI | undefined
}

// The scene-space rectangle currently visible on screen — this is what gets
// shared, so the receiver sees the same framing regardless of their own
// window/screen size (see fitBoundsToViewport in shareEncoding.ts).
const currentViewportBounds = (
  excalidrawAPI: ExcalidrawImperativeAPI | undefined
): SharedViewportBounds | null => {
  if (!excalidrawAPI) return null
  const appState = excalidrawAPI.getAppState()
  const topLeft = viewportCoordsToSceneCoords(
    { clientX: 0, clientY: 0 },
    { zoom: appState.zoom, offsetLeft: 0, offsetTop: 0, scrollX: appState.scrollX, scrollY: appState.scrollY }
  )
  const bottomRight = viewportCoordsToSceneCoords(
    { clientX: appState.width, clientY: appState.height },
    { zoom: appState.zoom, offsetLeft: 0, offsetTop: 0, scrollX: appState.scrollX, scrollY: appState.scrollY }
  )
  return { x1: topLeft.x, y1: topLeft.y, x2: bottomRight.x, y2: bottomRight.y }
}

const copyToClipboard = async (
  text: string,
  fallbackRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to legacy fallback below
  }
  try {
    const el = fallbackRef.current
    if (!el) return false
    el.select()
    return document.execCommand('copy')
  } catch {
    return false
  }
}

function ShareDialog({ onClose, excalidrawAPI }: ShareDialogProps) {
  const { t } = useTranslation()
  const activeTab = useAppSelector(selectActiveTab)
  const linkInputRef = useRef<HTMLInputElement>(null)
  const embedTextareaRef = useRef<HTMLTextAreaElement>(null)
  const [linkCopied, setLinkCopied] = useState(false)
  const [embedCopied, setEmbedCopied] = useState(false)

  const envelope = buildShareEnvelope(
    activeTab,
    currentViewportBounds(excalidrawAPI)
  )
  const shareUrl = buildShareUrl(envelope, { viewer: false })
  const embedUrl = buildShareUrl(envelope, { viewer: true })
  const embedSnippet = buildEmbedSnippet(embedUrl)

  const handleCopyLink = async () => {
    const ok = await copyToClipboard(shareUrl, linkInputRef)
    if (ok) {
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
  }

  const handleCopyEmbed = async () => {
    const ok = await copyToClipboard(embedSnippet, embedTextareaRef)
    if (ok) {
      setEmbedCopied(true)
      setTimeout(() => setEmbedCopied(false), 2000)
    }
  }

  return (
    <Modal title={t('Share.Title')} onClose={onClose}>
      <div className="ShareDialog">
        {activeTab.selectedDiagram === null && (
          <p className="ShareDialog__note">{t('Share.NoSchemaSelectedNote')}</p>
        )}

        <div className="ShareDialog__section">
          <h3>{t('Share.LinkSectionTitle')}</h3>
          <p>{t('Share.LinkDescription')}</p>
          <div className="ShareDialog__row">
            <input
              ref={linkInputRef}
              type="text"
              readOnly
              value={shareUrl}
              onFocus={e => e.currentTarget.select()}
            />
            <button
              type="button"
              className={buttonClasses}
              onClick={handleCopyLink}
            >
              {linkCopied ? t('Share.CopyLinkSuccess') : t('Share.CopyLink')}
            </button>
          </div>
        </div>

        <div className="ShareDialog__section">
          <h3>{t('Share.EmbedSectionTitle')}</h3>
          <p>{t('Share.EmbedDescription')}</p>
          <p className="ShareDialog__note">{t('Share.ViewerModeNote')}</p>
          <div className="ShareDialog__row">
            <textarea
              ref={embedTextareaRef}
              readOnly
              rows={3}
              value={embedSnippet}
              onFocus={e => e.currentTarget.select()}
            />
            <button
              type="button"
              className={buttonClasses}
              onClick={handleCopyEmbed}
            >
              {embedCopied ? t('Share.CopyEmbedSuccess') : t('Share.CopyEmbedCode')}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ShareDialog
