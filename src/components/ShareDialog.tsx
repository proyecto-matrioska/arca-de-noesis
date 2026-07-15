import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import { useAppSelector } from '../state/store'
import { selectActiveTab } from '../state/dialecticsSlice'
import {
  buildEmbedSnippet,
  buildShareEnvelope,
  buildShareUrl,
} from '../state/shareEncoding'
import './ShareDialog.css'

const buttonClasses =
  'ExcButton ExcButton--color-primary ExcButton--variant-filled ExcButton--size-small'

interface ShareDialogProps {
  onClose: () => void
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

function ShareDialog({ onClose }: ShareDialogProps) {
  const { t } = useTranslation()
  const activeTab = useAppSelector(selectActiveTab)
  const linkInputRef = useRef<HTMLInputElement>(null)
  const embedTextareaRef = useRef<HTMLTextAreaElement>(null)
  const [linkCopied, setLinkCopied] = useState(false)
  const [embedCopied, setEmbedCopied] = useState(false)

  const envelope = buildShareEnvelope(activeTab)
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
