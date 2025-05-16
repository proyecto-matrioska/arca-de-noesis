import React, { FC, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useMediaQuery } from 'react-responsive'

interface ModalProps {
  children: React.ReactNode
  title: string
  onClose: () => void
}

const Modal: FC<ModalProps> = ({ children, title, onClose }) => {
  const defaultDarkMode = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
  })

  const closeHandler = useCallback(() => {
    if (onClose) return onClose()
  }, [onClose])

  const escapeCallback = useCallback<(e: KeyboardEvent) => void>(
    e => {
      if (e.key === 'Escape') closeHandler()
    },
    [closeHandler]
  )

  useEffect(() => {
    document.addEventListener('keyup', escapeCallback)
    return () => document.removeEventListener('keyup', escapeCallback)
  }, [escapeCallback])

  return (
    <>
      {createPortal(
        <div
          className={`excalidraw excalidraw-modal-container ${
            defaultDarkMode && 'theme--dark'
          }`}
        >
          <div className="Modal Dialog" role="dialog" aria-modal="true">
            <div className="Modal__background" onClick={closeHandler} />
            <div className="Modal__content">
              <div className="Island">
                <div className="Dialog__title">
                  <span className="Dialog__titleContent">{title}</span>
                </div>
                <button
                  className="Dialog__close"
                  title="Close"
                  onClick={closeHandler}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <g
                      clipPath="url(#a)"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 5 5 15M5 5l10 10"></path>
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M0 0h20v20H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <div className="Dialog__content">{children}</div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
export default Modal
