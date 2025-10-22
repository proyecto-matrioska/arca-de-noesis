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
  intentional?: boolean
}

function Duality({ duality, onChange, intentional = true }: DualityProps) {
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
          <th>{t('Editor.Intention')}</th>
          <th>{t('Editor.Extension')}</th>
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
              intentional={true}
            />
          </li>
          <li>
            <Duality
              duality={y}
              onChange={changeHandler(1)}
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
