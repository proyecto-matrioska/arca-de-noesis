import { useDispatch, useSelector } from 'react-redux'
import './Editor.css'
import {
  deleteEntry,
  insertEntry,
  moveDownEntry,
  moveUpEntry,
  updateEntry,
} from '../state/dialecticsSlice'

function Duality({ duality, onChange, intentional = true }) {
  const [a, b, c, d] = duality
  const changeHandler = index => e => {
    const updatedDuality = [a, b, c, d]
    updatedDuality[index] = e.target.value
    onChange(updatedDuality)
  }
  return (
    <table className="Duality">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>Intensión</th>
          <th>Extensión</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan="2">
            <b>{intentional ? 'I.' : 'E.'}</b>
          </td>
          <td>
            <b>I.</b>
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
            <b>E.</b>
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

function DataItem({ index, item }) {
  const dispatch = useDispatch()
  const [x, y] = item
  const changeHandler = dualityIndex => updatedDuality => {
    const update = [x, y]
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
          title="Subir"
          onClick={moveUpHandler}
        >
          ▲
        </button>
        <button
          type="button"
          className="excalidraw-button"
          title="Bajar"
          onClick={moveDownHandler}
        >
          ▼
        </button>
        <button
          type="button"
          className="excalidraw-button"
          title="Insertar dualidad"
          onClick={insertHandler}
        >
          ✚
        </button>
        <button
          type="button"
          className="excalidraw-button"
          title="Eliminar"
          onClick={deleteHandler}
        >
          ✖
        </button>
      </div>
    </li>
  )
}

function Editor() {
  const data = useSelector(state => state.dialectics.data)
  return (
    <div className="Editor">
      <div className='EditorContents'>
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
