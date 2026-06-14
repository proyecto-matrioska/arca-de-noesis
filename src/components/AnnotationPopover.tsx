import { useEffect, useRef } from 'react'
import './AnnotationPopover.css'
import { useTranslation } from 'react-i18next'

export type AnnotationTarget = {
  entryIndex: number
  dualityIndex: 0 | 1
  anchorRect: DOMRect
}

interface AnnotationPopoverProps {
  target: AnnotationTarget
  value: string
  onChange: (text: string) => void
  onClose: () => void
}

function AnnotationPopover({
  target,
  value,
  onChange,
  onClose,
}: AnnotationPopoverProps) {
  const { t } = useTranslation()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
    textareaRef.current?.select()
  }, [target.entryIndex, target.dualityIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const handlePointerDown = (e: PointerEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [onClose])

  // Position the popover below-right of the anchor, clamped to viewport
  const { anchorRect } = target
  const top = Math.min(
    anchorRect.bottom + 4,
    window.innerHeight - 120
  )
  const left = Math.min(
    anchorRect.left,
    window.innerWidth - 216
  )

  return (
    <div
      ref={popoverRef}
      className="AnnotationPopover"
      style={{ top, left }}
    >
      <textarea
        ref={textareaRef}
        className="AnnotationPopover__textarea"
        value={value}
        placeholder={t('Annotation.Placeholder')}
        onChange={e => onChange(e.target.value)}
      />
      <span className="AnnotationPopover__hint">Esc {t('Annotation.EscHint')}</span>
    </div>
  )
}

export default AnnotationPopover
