import './FileTabs.css'
import { useAppDispatch, useAppSelector } from '../state/store'
import { addTab, closeTab, switchTab } from '../state/dialecticsSlice'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

const isMac =
  typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
const modKeyLabel = isMac ? '⌘' : 'Ctrl'
const altKeyLabel = isMac ? '⌥' : 'Alt'
const newTabShortcut = `${modKeyLabel}+${altKeyLabel}+N`
const closeTabShortcut = `${modKeyLabel}+${altKeyLabel}+W`

function FileTabs() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const tabs = useAppSelector(state => state.dialectics.tabs)
  const activeTabId = useAppSelector(state => state.dialectics.activeTabId)
  const isDark = useMediaQuery({ query: '(prefers-color-scheme: dark)' })

  const handleClose = (e: React.MouseEvent, id: string, isDirty: boolean) => {
    e.stopPropagation()
    if (isDirty && !window.confirm(t('Tabs.UnsavedConfirm'))) return
    dispatch(closeTab({ id }))
  }

  return (
    <div className={`FileTabs excalidraw${isDark ? ' theme--dark' : ''}`}>
      {tabs.map(tab => {
        const isActive = tab.id === activeTabId
        const displayName = tab.filename || t('Tabs.Untitled')
        return (
          <div
            key={tab.id}
            className={`FileTab${isActive ? ' FileTab--active' : ''}`}
            onClick={() => dispatch(switchTab({ id: tab.id }))}
            title={tab.filename || t('Tabs.Untitled')}
          >
            <span className="FileTab__name">{displayName}</span>
            {tab.isDirty && <span className="FileTab__dirty">•</span>}
            {tabs.length > 1 && (
              <button
                type="button"
                className="FileTab__close"
                aria-label={t('Tabs.Close')}
                title={`${t('Tabs.Close')} (${closeTabShortcut})`}
                onClick={e => handleClose(e, tab.id, tab.isDirty)}
              >
                ×
              </button>
            )}
          </div>
        )
      })}
      <button
        type="button"
        className="FileTabs__add"
        title={`${t('Tabs.NewTab')} (${newTabShortcut})`}
        onClick={() => dispatch(addTab())}
      >
        +
      </button>
    </div>
  )
}

export default FileTabs
