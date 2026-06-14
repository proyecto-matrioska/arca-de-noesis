import './FileTabs.css'
import { useAppDispatch, useAppSelector } from '../state/store'
import { addTab, closeTab, switchTab } from '../state/dialecticsSlice'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

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
        title={t('Tabs.NewTab')}
        onClick={() => dispatch(addTab())}
      >
        +
      </button>
    </div>
  )
}

export default FileTabs
