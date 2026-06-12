import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import './Editor.css'
import {
  deleteEntry,
  insertEntry,
  moveDownEntry,
  moveUpEntry,
  updateEntry,
} from '../state/dialecticsSlice'
import { DialecticsDataEntry } from '../schemas/schema'
import { DualityData } from '../schemas/schema'
import React from 'react'
import { useAppSelector } from '../state/store'

interface DualityProps {
  duality: DualityData
  onChange: (data: DualityData) => void
  onSwapIntCol: () => void
  onSwapExtCol: () => void
  onSwapIntRow: () => void
  onSwapExtRow: () => void
  intentional?: boolean
}

function Duality({
  duality,
  onChange,
  onSwapIntCol,
  onSwapExtCol,
  onSwapIntRow,
  onSwapExtRow,
  intentional = true,
}: DualityProps) {
  const [a, b, c, d] = duality
  const { t } = useTranslation()
  const changeHandler =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedDuality: DualityData = [a, b, c, d]
      updatedDuality[index] = e.target.value
      onChange(updatedDuality)
    }
  return (
    <table className="Duality">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>
            {t('Editor.Intention')}
            <button
              type="button"
              className="excalidraw-button swap-btn"
              title={t('Editor.SwapIntCol')}
              onClick={onSwapIntCol}
            >
              ⇅
            </button>
          </th>
          <th>
            {t('Editor.Extension')}
            <button
              type="button"
              className="excalidraw-button swap-btn"
              title={t('Editor.SwapExtCol')}
              onClick={onSwapExtCol}
            >
              ⇅
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={2}>
            <b>
              {intentional
                ? t('Editor.IntentionAbbrv')
                : t('Editor.ExtensionAbbrv')}
            </b>
          </td>
          <td>
            <b>{t('Editor.IntentionAbbrv')}</b>
            <button
              type="button"
              className="excalidraw-button swap-btn"
              title={t('Editor.SwapIntRow')}
              onClick={onSwapIntRow}
            >
              ⇄
            </button>
          </td>
          <td>
            <input type="text" value={a} onChange={changeHandler(0)} />
          </td>
          <td>
            <input type="text" value={b} onChange={changeHandler(1)} />
          </td>
        </tr>
        <tr>
          <td>
            <b>{t('Editor.ExtensionAbbrv')}</b>
            <button
              type="button"
              className="excalidraw-button swap-btn"
              title={t('Editor.SwapExtRow')}
              onClick={onSwapExtRow}
            >
              ⇄
            </button>
          </td>
          <td>
            <input type="text" value={c} onChange={changeHandler(2)} />
          </td>
          <td>
            <input type="text" value={d} onChange={changeHandler(3)} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

interface DataItemProps {
  index: number
  item: DialecticsDataEntry
}

function DataItem({ index, item }: DataItemProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [x, y]: DialecticsDataEntry = item
  const changeHandler =
    (dualityIndex: number) => (updatedDuality: DualityData) => {
      const update: DialecticsDataEntry = [x, y]
      update[dualityIndex] = updatedDuality
      dispatch(updateEntry({ update, index }))
    }
  const moveUpHandler = () => dispatch(moveUpEntry({ index }))
  const moveDownHandler = () => dispatch(moveDownEntry({ index }))
  const insertHandler = () => dispatch(insertEntry({ index }))
  const deleteHandler = () => dispatch(deleteEntry({ index }))

  const swapHandler =
    (di: number, transform: (d: DualityData) => DualityData) => () => {
      const duality = di === 0 ? x : y
      const update: DialecticsDataEntry = [x, y]
      update[di] = transform(duality)
      dispatch(updateEntry({ update, index }))
    }

  const swapDualitiesHandler = () =>
    dispatch(updateEntry({ update: [y, x] as DialecticsDataEntry, index }))

  return (
    <li className="DataItem">
      <div>
        <ul>
          <li>
            <center>
              <b>{index + 1}</b>
            </center>
          </li>
          <li>
            <Duality
              duality={x}
              onChange={changeHandler(0)}
              onSwapIntCol={swapHandler(0, ([p, q, r, s]) => [r, q, p, s])}
              onSwapExtCol={swapHandler(0, ([p, q, r, s]) => [p, s, r, q])}
              onSwapIntRow={swapHandler(0, ([p, q, r, s]) => [q, p, r, s])}
              onSwapExtRow={swapHandler(0, ([p, q, r, s]) => [p, q, s, r])}
              intentional={true}
            />
          </li>
          <li className="DualitySwapControl">
            <button
              type="button"
              className="excalidraw-button swap-btn"
              title={t('Editor.SwapDualities')}
              onClick={swapDualitiesHandler}
            >
              ⇅
            </button>
          </li>
          <li>
            <Duality
              duality={y}
              onChange={changeHandler(1)}
              onSwapIntCol={swapHandler(1, ([p, q, r, s]) => [r, q, p, s])}
              onSwapExtCol={swapHandler(1, ([p, q, r, s]) => [p, s, r, q])}
              onSwapIntRow={swapHandler(1, ([p, q, r, s]) => [q, p, r, s])}
              onSwapExtRow={swapHandler(1, ([p, q, r, s]) => [p, q, s, r])}
              intentional={false}
            />
          </li>
        </ul>
      </div>

      <div className="ItemControls">
        <button
          type="button"
          className="excalidraw-button"
          title={t('Editor.MoveUp')}
          onClick={moveUpHandler}
        >
          ▲
        </button>
        <button
          type="button"
          className="excalidraw-button"
          title={t('Editor.MoveDown')}
          onClick={moveDownHandler}
        >
          ▼
        </button>
        <button
          type="button"
          className="excalidraw-button"
          title={t('Editor.InsertDuality')}
          onClick={insertHandler}
        >
          ✚
        </button>
        <button
          type="button"
          className="excalidraw-button"
          title={t('Editor.DeleteDuality')}
          onClick={deleteHandler}
        >
          ✖
        </button>
      </div>
    </li>
  )
}

function Editor() {
  const data = useAppSelector(state => state.dialectics.data)
  return (
    <div className="Editor">
      <div className="EditorContents">
        <ul className="Dualities">
          {data.map((item, index) => (
            <DataItem key={`DataItem-${index}`} item={item} index={index} />
          ))}
        </ul>
        <div className="EditorControls" />
      </div>
    </div>
  )
}

export default Editor
