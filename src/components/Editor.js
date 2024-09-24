import './Editor.css'

const smallButtonClasses =
  'ExcButton ExcButton--color-primary ExcButton--variant-filled ExcButton--size-small'

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

function DataItem({ index, item, onChange }) {
  const [x, y] = item
  const changeHandler = dualityIndex => updatedDuality => {
    const updatedDataItem = [x, y]
    updatedDataItem[dualityIndex] = updatedDuality
    onChange({
      action: 'update',
      data: updatedDataItem,
    })
  }
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
          className={`${smallButtonClasses}`}
          title="Subir"
          onClick={() => onChange({ action: 'move-up' })}
        >
          ▲
        </button>
        <button
          type="button"
          className={`${smallButtonClasses}`}
          title="Bajar"
          onClick={() => onChange({ action: 'move-down' })}
        >
          ▼
        </button>
        <button
          type="button"
          className={`${smallButtonClasses}`}
          title="Eliminar"
          onClick={() => onChange({ action: 'delete' })}
        >
          ✖
        </button>
      </div>
    </li>
  )
}

function Editor({ data, onChange }) {
  const changeHandler = index => action => {
    onChange({
      ...action,
      index,
    })
  }
  const appendHandler = () => onChange({ action: 'append' })
  return (
    <div className="Editor">
      <ul className="Dualities">
        {data.map((item, index) => (
          <DataItem
            key={`DataItem-${index}`}
            item={item}
            onChange={changeHandler(index)}
            index={index}
          />
        ))}
      </ul>
      <div className="EditorControls">
        <button
          type="button"
          className={`${smallButtonClasses}`}
          title="Nueva dualidad"
          onClick={appendHandler}
        >
          ✚
        </button>
      </div>
    </div>
  )
}

export default Editor
