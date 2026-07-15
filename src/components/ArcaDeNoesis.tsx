import { useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  convertToExcalidrawElements,
  Excalidraw,
  MainMenu,
  Sidebar,
} from '@excalidraw/excalidraw'
import {
  ExcalidrawImperativeAPI,
  NormalizedZoomValue,
} from '@excalidraw/excalidraw/dist/types/excalidraw/types'
import { ExcalidrawElementSkeleton } from '@excalidraw/excalidraw/dist/types/excalidraw/data/transform'
import '@excalidraw/excalidraw/index.css'
import './ExcalidrawCustom.css'
import './ArcaDeNoesis.css'
import Editor from './Editor'
import FileTabs from './FileTabs'
import OptionsPanel from './OptionsPanel'
import ShareDialog from './ShareDialog'
import { useAppDispatch, useAppSelector } from '../state/store'
import {
  saveAsDataFile,
  saveDataFile,
  loadDataFile,
  loadExample,
  prefixExampleDualities,
} from '../state/fileThunks'
import { isViewerModeActive } from '../state/shareEncoding'
import { DialecticsDataEntry } from '../schemas/schema'
import { SchemaOption } from '../state/uiOptions'
import { SchemaIdentifier } from '../schemas/schema'
import { factorData } from '../schemas/transformations/factorization'
import { initialScreen } from '../schemas/initialScreen'
import { dualitySequence } from '../schemas/duals'
import { squareSequence, complexSquareSequence } from '../schemas/squares'
import {
  complexOctagonSequence,
  empiricalComplexOctagonSequence,
} from '../schemas/octagons'
import {
  tripleSquareSequence,
  empiricalTripleSquareSequence,
} from '../schemas/triples'
import {
  dialecticSequence,
  empiricalDialecticSequence,
} from '../schemas/dialectics'
import { procesualSequence } from '../schemas/procesual'
import { capasDiscursivasSequence } from '../schemas/layers'
import { matrioskaSequence } from '../schemas/matrioska'
import { useTranslation } from 'react-i18next'
import {
  selectActiveTab,
  setTabSelectedDiagram,
  setTabSidebarOpen,
  setTabSidebarActiveTab,
  setExcalidrawViewport,
  ExcalidrawViewport,
  SidebarTabId,
  addTab,
  closeTab,
  switchTab,
} from '../state/dialecticsSlice'

const isMac =
  typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
const modKeyLabel = isMac ? '⌘' : 'Ctrl'

const smallButtonClasses =
  'ExcButton ExcButton--color-primary ExcButton--variant-filled ExcButton--size-small'

function ArcaDeNoesis() {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector(selectActiveTab)
  const dialecticsData: DialecticsDataEntry[] = activeTab.entries.map(
    e => e.data
  )
  const annotations = activeTab.entries.map(e => e.annotations)
  const dataFilename = activeTab.filename
  const isDirty = activeTab.isDirty
  const anyDirty = useAppSelector(state =>
    state.dialectics.tabs.some(t => t.isDirty)
  )

  const activeTabId = useAppSelector(state => state.dialectics.activeTabId)
  const tabs = useAppSelector(state => state.dialectics.tabs)
  const isSidebarOpen = activeTab.isSidebarOpen
  const selectedDiagram = activeTab.selectedDiagram
  const schemaOptions = activeTab.schemaOptions
  const generalOptions = activeTab.generalOptions
  const diagramAutoupdate = generalOptions.diagramAutoupdate
  const showAnnotations: boolean = generalOptions.showAnnotations?.value ?? false

  const isViewerMode = isViewerModeActive()
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()
  const sidebarActuallyOpen = useRef(false)
  // Prevents onStateChange from writing to Redux during programmatic tab-sync toggles
  const sidebarSyncRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [sidebarWidth, setSidebarWidth] = useState(302)

  const defaultDarkMode = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined,
    isSystemDark =>
      excalidrawAPI?.updateScene({
        appState: {
          viewBackgroundColor: isSystemDark ? '#e8e8e8' : '#fcf5e4',
        },
      })
  )
  const hasFileSystemAccessAPI = 'showSaveFilePicker' in window
  const { t, i18n } = useTranslation()
  const currentLanguage = (
    i18n.language ||
    window.navigator.language ||
    'en'
  ).split('-')[0]

  const openEditorTab = () => {
    if (!isSidebarOpen)
      excalidrawAPI?.toggleSidebar({ name: 'edit-sidebar', tab: 'dataEditor' })
  }
  const loadFileOptHandler = async () => {
    dispatch(loadDataFile(true))
    editarOptHandler()
  }
  const saveFileOptHandler = () => {
    dispatch(saveDataFile())
  }
  const saveAsFileOptHandler = () => {
    dispatch(saveAsDataFile())
  }
  const selectSchemaHandler = (schema: SchemaIdentifier) => () => {
    dispatch(setTabSelectedDiagram(schema))
  }
  const editarOptHandler = () => {
    openEditorTab()
  }
  const loadExampleHandler = (exampleName: string) => () => {
    if (isDirty && !window.confirm(t('Tabs.UnsavedConfirm'))) return
    dispatch(loadExample(exampleName))
    editarOptHandler()
  }
  const prefixExampleDualitiesHandler = () => {
    dispatch(prefixExampleDualities(currentLanguage))
    editarOptHandler()
  }
  const shareOptHandler = () => setIsShareDialogOpen(true)

  const buildDiagramElements = useCallback((): ExcalidrawElementSkeleton[] => {
    const factorizationId = generalOptions.factorizations.value
    const annotationsParam = showAnnotations ? annotations : undefined
    let maker: (
      dualities: DialecticsDataEntry[],
      schemaOptions: { [key: string]: SchemaOption },
      translations: (key: string) => string,
      annotations?: [string, string][]
    ) => ExcalidrawElementSkeleton[] = () => []
    switch (selectedDiagram) {
      case 'dualidades':
        maker = dualitySequence
        break
      case 'cuadros':
        maker = squareSequence
        break
      case 'cuadros-complejos':
        maker = complexSquareSequence
        break
      case 'octagonos':
        maker = complexOctagonSequence
        break
      case 'octagonos-empiricos':
        maker = empiricalComplexOctagonSequence
        break
      case 'triadas':
        maker = tripleSquareSequence
        break
      case 'triadas-empiricas':
        maker = empiricalTripleSquareSequence
        break
      case 'dialectica':
        maker = dialecticSequence
        break
      case 'dialectica-empirica':
        maker = empiricalDialecticSequence
        break
      case 'procesual':
        maker = procesualSequence
        break
      case 'capas-discursivas':
        maker = capasDiscursivasSequence
        break
      case 'matrioskas':
        maker = matrioskaSequence
        break
      default:
        break
    }
    const dialecticsSchema = selectedDiagram
      ? maker(
        factorData(factorizationId, dialecticsData),
        {
          ...schemaOptions[selectedDiagram],
          showDualityIndex: generalOptions.showDualityIndex,
        },
        t,
        annotationsParam
      )
      : []
    return convertToExcalidrawElements(
      dialecticsSchema as ExcalidrawElementSkeleton[]
    )
  }, [
    annotations,
    dialecticsData,
    generalOptions.factorizations.value,
    generalOptions.showDualityIndex,
    schemaOptions,
    selectedDiagram,
    showAnnotations,
    t,
  ])

  const updateDiagram = useCallback(() => {
    excalidrawAPI?.updateScene({
      elements: buildDiagramElements(),
    })
  }, [buildDiagramElements, excalidrawAPI])

  // Computed fresh every render, but only read once by Excalidraw on mount
  // (as `initialData.elements`) — when a diagram is preselected (e.g. from a
  // shared URL, hydrated synchronously into the Redux initial state), this
  // ensures the correct diagram is already there on first paint instead of
  // racing with Excalidraw's own async initial-scene setup.
  const elements = selectedDiagram
    ? buildDiagramElements()
    : convertToExcalidrawElements(initialScreen())

  // A viewport hydrated from a shared URL (see hydrateTabFromShareUrl) is
  // applied directly here rather than via a post-mount updateScene call, for
  // the same race-avoidance reason as `elements` above. scrollToContent must
  // be disabled in this case — otherwise Excalidraw's own auto-fit-to-content
  // computation would override the explicit scroll/zoom we're restoring.
  const initialViewport = activeTab.excalidrawViewport

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (anyDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [anyDirty])

  // Global keyboard shortcuts: save / save as / open / new tab / close tab / switch tab
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey
      if (!mod) return

      // Use event.code (physical key) rather than event.key: on AltGr/international
      // keyboard layouts, holding Ctrl+Alt can make event.key resolve to a composed
      // character instead of the plain letter, silently breaking these shortcuts.
      if (e.altKey) {
        switch (e.code) {
          case 'KeyN':
            e.preventDefault()
            dispatch(addTab())
            break
          case 'KeyW':
            e.preventDefault()
            if (activeTab.isDirty && !window.confirm(t('Tabs.UnsavedConfirm')))
              return
            dispatch(closeTab({ id: activeTabId }))
            break
          case 'ArrowRight':
          case 'ArrowLeft': {
            e.preventDefault()
            const idx = tabs.findIndex(tb => tb.id === activeTabId)
            if (idx === -1) return
            const delta = e.code === 'ArrowRight' ? 1 : -1
            const nextIdx = (idx + delta + tabs.length) % tabs.length
            dispatch(switchTab({ id: tabs[nextIdx].id }))
            break
          }
          default:
            break
        }
        return
      }

      switch (e.code) {
        case 'KeyS':
          e.preventDefault()
          if (e.shiftKey) {
            if (hasFileSystemAccessAPI) dispatch(saveAsDataFile())
          } else {
            dispatch(saveDataFile())
          }
          break
        case 'KeyO':
          e.preventDefault()
          dispatch(loadDataFile(true))
          openEditorTab()
          break
        case 'KeyE':
          e.preventDefault()
          excalidrawAPI?.toggleSidebar({ name: 'edit-sidebar', tab: 'dataEditor' })
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [
    activeTab.isDirty,
    activeTabId,
    dispatch,
    excalidrawAPI,
    hasFileSystemAccessAPI,
    isSidebarOpen,
    t,
    tabs,
  ])

  // Diagram update on tab switch or schema change; clear canvas when no schema is selected
  useEffect(() => {
    if (selectedDiagram) {
      updateDiagram()
    } else {
      excalidrawAPI?.updateScene({ elements: convertToExcalidrawElements(initialScreen()) })
    }
  }, [activeTabId, selectedDiagram, updateDiagram, excalidrawAPI])

  // Sidebar sync on tab switch — use force to avoid toggle ambiguity
  useEffect(() => {
    if (!excalidrawAPI) return
    const shouldBeOpen = activeTab.isSidebarOpen
    if (shouldBeOpen !== sidebarActuallyOpen.current) {
      sidebarSyncRef.current = true
      excalidrawAPI.toggleSidebar({
        name: 'edit-sidebar',
        force: shouldBeOpen,
        tab: shouldBeOpen ? activeTab.sidebarActiveTab : undefined,
      })
    }
  }, [activeTabId, excalidrawAPI])

  // Auto-update diagram when data or options change
  useEffect(() => {
    if (diagramAutoupdate && selectedDiagram) updateDiagram()
    return () => { }
  }, [dialecticsData, diagramAutoupdate, selectedDiagram, updateDiagram])

  useEffect(() => {
    const el = containerRef.current?.querySelector<HTMLElement>('.excalidraw-wrapper > .excalidraw')
    el?.style.setProperty('--right-sidebar-width', `${sidebarWidth}px`)
  }, [sidebarWidth, isSidebarOpen])

  // --- Viewport save / restore on tab switch ---
  const prevTabIdRef = useRef<string>(activeTabId)

  // Capture new tab's viewport at render time so the restore effect doesn't
  // need it in its dependency array (avoids firing on every viewport save).
  const pendingViewportRef = useRef<ExcalidrawViewport | null>(activeTab.excalidrawViewport)
  if (prevTabIdRef.current !== activeTabId) {
    pendingViewportRef.current = activeTab.excalidrawViewport
  }

  useEffect(() => {
    if (!excalidrawAPI) return
    const prevTabId = prevTabIdRef.current
    if (prevTabId === activeTabId) return

    // Save the viewport we're leaving
    const appState = excalidrawAPI.getAppState()
    dispatch(
      setExcalidrawViewport({
        viewport: {
          scrollX: appState.scrollX,
          scrollY: appState.scrollY,
          zoom: appState.zoom.value,
        },
        tabId: prevTabId,
      })
    )
    prevTabIdRef.current = activeTabId
  }, [activeTabId, excalidrawAPI, dispatch])

  useEffect(() => {
    if (!excalidrawAPI) return
    const viewport = pendingViewportRef.current
    if (!viewport) return
    excalidrawAPI.updateScene({
      appState: {
        scrollX: viewport.scrollX,
        scrollY: viewport.scrollY,
        zoom: { value: viewport.zoom as NormalizedZoomValue },
      },
    })
  }, [activeTabId, excalidrawAPI])
  // --- end viewport ---

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      const startX = e.clientX
      const startWidth = sidebarWidth
      const onMove = (ev: MouseEvent) => {
        const delta = startX - ev.clientX
        setSidebarWidth(Math.max(200, Math.min(700, startWidth + delta)))
      }
      const onUp = () => {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [sidebarWidth]
  )

  return (
    <div
      className={`ArcaDeNoesis${isViewerMode ? ' viewer-mode' : ''}`}
      ref={containerRef}
    >
      {!isViewerMode && <FileTabs />}
      <div className="excalidraw-wrapper">
        <Excalidraw
          UIOptions={{
            dockedSidebarBreakpoint: 0,
          }}
          initialData={{
            elements,
            appState: {
              viewBackgroundColor: defaultDarkMode ? '#e8e8e8' : '#fcf5e4',
              viewModeEnabled: true,
              ...(initialViewport
                ? {
                  scrollX: initialViewport.scrollX,
                  scrollY: initialViewport.scrollY,
                  zoom: { value: initialViewport.zoom as NormalizedZoomValue },
                }
                : { zoom: { value: 0.5 as NormalizedZoomValue } }),
            },
            scrollToContent: !initialViewport,
          }}
          gridModeEnabled={true}
          theme={defaultDarkMode ? 'dark' : 'light'}
          viewModeEnabled={isViewerMode || undefined}
          excalidrawAPI={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
        >
          {!isViewerMode && (
          <MainMenu>
            <MainMenu.Group title={t('MainMenu.Data')}>
              <MainMenu.Item
                onSelect={loadFileOptHandler}
                shortcut={`${modKeyLabel}+O`}
              >
                {t('MainMenu.Open')}
              </MainMenu.Item>
              <MainMenu.Item
                onSelect={saveFileOptHandler}
                shortcut={`${modKeyLabel}+S`}
              >
                {t('MainMenu.Save')}
              </MainMenu.Item>
              {hasFileSystemAccessAPI && (
                <MainMenu.Item
                  onSelect={saveAsFileOptHandler}
                  shortcut={`${modKeyLabel}+Shift+S`}
                >
                  {t('MainMenu.SaveAs')}
                </MainMenu.Item>
              )}
              <MainMenu.Item
                onSelect={editarOptHandler}
                shortcut={`${modKeyLabel}+E`}
              >
                {t('MainMenu.Edit')}
              </MainMenu.Item>
              <MainMenu.Item onSelect={shareOptHandler}>
                {t('MainMenu.Share')}
              </MainMenu.Item>
              <MainMenu.Item onSelect={prefixExampleDualitiesHandler}>
                {t('MainMenu.PrefixExampleDualities')}
              </MainMenu.Item>
            </MainMenu.Group>
            <MainMenu.Group title={t('MainMenu.Examples')}>
              <MainMenu.Item
                onSelect={loadExampleHandler(
                  currentLanguage === 'en' ? 'metafisicaEN' : 'metafisica'
                )}
              >
                {t('MainMenu.MetaphysicsExample')}
              </MainMenu.Item>
              <MainMenu.Item
                onSelect={loadExampleHandler(
                  currentLanguage === 'en'
                    ? 'intensionalidadEN'
                    : 'intensionalidad'
                )}
              >
                {t('MainMenu.IntentionalityVsIntensionExample')}
              </MainMenu.Item>
              <MainMenu.Item
                onSelect={loadExampleHandler(
                  currentLanguage === 'en'
                    ? 'rosalindKraussEN'
                    : 'rosalindKrauss'
                )}
              >
                {t('MainMenu.KraussExample')}
              </MainMenu.Item>
            </MainMenu.Group>
            <MainMenu.Separator />
            <MainMenu.Group title={t('MainMenu.CurrentDiagram')}>
              <MainMenu.DefaultItems.Export />
              <MainMenu.DefaultItems.SaveAsImage />
            </MainMenu.Group>
            <MainMenu.Separator />
            <MainMenu.Group title={t('MainMenu.SchemasGallery')}>
              <MainMenu.Item onSelect={selectSchemaHandler('dualidades')}>
                {t('SchemaNames.Dualities')}
              </MainMenu.Item>
              <MainMenu.Item onSelect={selectSchemaHandler('cuadros')}>
                {t('SchemaNames.Squares')}
              </MainMenu.Item>
              <MainMenu.Item
                onSelect={selectSchemaHandler('cuadros-complejos')}
              >
                {t('SchemaNames.ComplexSquares')}
              </MainMenu.Item>
              <MainMenu.Item onSelect={selectSchemaHandler('octagonos')}>
                {t('SchemaNames.Octagons')}
              </MainMenu.Item>
              <MainMenu.Item
                onSelect={selectSchemaHandler('octagonos-empiricos')}
              >
                {t('SchemaNames.EmpiricalOctagons')}
              </MainMenu.Item>
              <MainMenu.Item onSelect={selectSchemaHandler('triadas')}>
                {t('SchemaNames.Triads')}
              </MainMenu.Item>
              <MainMenu.Item
                onSelect={selectSchemaHandler('triadas-empiricas')}
              >
                {t('SchemaNames.EmpiricalTriads')}
              </MainMenu.Item>
              <MainMenu.Item onSelect={selectSchemaHandler('dialectica')}>
                {t('SchemaNames.Dialectics')}
              </MainMenu.Item>
              <MainMenu.Item
                onSelect={selectSchemaHandler('dialectica-empirica')}
              >
                {t('SchemaNames.EmpiricalDialectics')}
              </MainMenu.Item>
              <MainMenu.Item onSelect={selectSchemaHandler('procesual')}>
                {t('SchemaNames.Procesual')}
              </MainMenu.Item>
              <MainMenu.Item
                onSelect={selectSchemaHandler('capas-discursivas')}
              >
                {t('SchemaNames.DiscursiveLayers')}
              </MainMenu.Item>
              <MainMenu.Item onSelect={selectSchemaHandler('matrioskas')}>
                {t('SchemaNames.Matrioskas')}
              </MainMenu.Item>
            </MainMenu.Group>
            <MainMenu.Group title={t('MainMenu.About')}>
              <MainMenu.ItemLink href="https://proyecto-matrioska.github.io/notas/Proyecto%20Matrioska/">
                {t('MainMenu.ProyectoMatrioska')}
              </MainMenu.ItemLink>
            </MainMenu.Group>
          </MainMenu>
          )}
          {!isViewerMode && (
          <Sidebar
            name="edit-sidebar"
            docked={true}
            onStateChange={(e: any) => {
              const open = e !== null
              sidebarActuallyOpen.current = open
              if (sidebarSyncRef.current) {
                sidebarSyncRef.current = false
                if (selectedDiagram) updateDiagram()
                return
              }
              dispatch(setTabSidebarOpen(open))
              console.log('Sidebar state change')
            }}
          >
            <Sidebar.Header>
              <button
                type="button"
                className={smallButtonClasses}
                disabled={selectedDiagram === null}
                onClick={updateDiagram}
                title={t('Sidebar.RefreshDiagram')}
              >
                ⟲
              </button>
              <b>{dataFilename}</b>
              {isDirty && <span className="unsavedDataMark">🖫</span>}
            </Sidebar.Header>
            <Sidebar.Tabs>
              <Sidebar.Tab tab="dataEditor">
                <Editor />
              </Sidebar.Tab>
              <Sidebar.Tab tab="diagramOptions">
                <OptionsPanel />
              </Sidebar.Tab>
              <Sidebar.TabTriggers>
                <Sidebar.TabTrigger tab="dataEditor" onClick={() => dispatch(setTabSidebarActiveTab('dataEditor' as SidebarTabId))}>
                  {t('Sidebar.EditorTabName')}
                </Sidebar.TabTrigger>
                <Sidebar.TabTrigger tab="diagramOptions" onClick={() => dispatch(setTabSidebarActiveTab('diagramOptions' as SidebarTabId))}>
                  {t('Sidebar.SchemaTabName')}
                </Sidebar.TabTrigger>
              </Sidebar.TabTriggers>
            </Sidebar.Tabs>
          </Sidebar>
          )}
        </Excalidraw>
        {isSidebarOpen && !isViewerMode && (
          <div
            className="sidebar-resize-handle"
            style={{ right: sidebarWidth - 4 }}
            onMouseDown={handleResizeMouseDown}
          />
        )}
      </div>
      {isShareDialogOpen && (
        <ShareDialog
          onClose={() => setIsShareDialogOpen(false)}
          excalidrawAPI={excalidrawAPI}
        />
      )}
    </div>
  )
}

export default ArcaDeNoesis
