import { useDispatch, useSelector } from 'react-redux'
import './OptionsPanel.css'
import Switch from './Switch'
import { setDiagramOption } from '../state/uiSlice'

const BooleanOption = ({ optionId, name, longDescription, value }) => {
  const dispatch = useDispatch()
  const selectedDiagram = useSelector(state => state.ui.selectedDiagram)
  return (
    <div className="BooleanOption" title={longDescription}>
      <div>{name}:</div>
      <div>
        <Switch
          id={`${selectedDiagram}-checkbox-${optionId}`}
          name={`${selectedDiagram}-checkbox-${optionId}`}
          defaultValue={value}
          onChange={b =>
            dispatch(
              setDiagramOption({
                diagramName: selectedDiagram,
                optionId,
                value: b,
              })
            )
          }
          title={longDescription}
        />
      </div>
    </div>
  )
}

const SelectOption = ({ optionId, name, longDescription, value, options }) => {
  const dispatch = useDispatch()
  const selectedDiagram = useSelector(state => state.ui.selectedDiagram)
  return (
    <div className="SelectOption" title={longDescription}>
      <div>{name}:</div>
      <div>
        <select
          id={`${selectedDiagram}-select-${optionId}`}
          name={`${selectedDiagram}-select-${optionId}`}
          className="dropdown-select"
          defaultValue={value}
          onChange={e =>
            dispatch(
              setDiagramOption({
                diagramName: selectedDiagram,
                optionId,
                value: e.target.value,
              })
            )
          }
          title={longDescription}
        >
          {options.map(opt => (
            <option value={opt.value}>{opt.name}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

const SchemaOption = ({ optionId, optionData }) => {
  const { type } = optionData
  let OptionComponent = <div />
  switch (type) {
    case 'bool':
      OptionComponent = BooleanOption
      break
    case 'select':
      OptionComponent = SelectOption
      break
    default:
      OptionComponent = <div />
      break
  }
  return <OptionComponent optionId={optionId} {...optionData} />
}

const OptionsPanel = () => {
  const schemaOptions = useSelector(state => state.ui.schemaOptions)
  const selectedDiagram = useSelector(state => state.ui.selectedDiagram)
  const diagramOptions = schemaOptions[selectedDiagram] ?? {}
  return (
    <div className="OptionsPanel">
      <div className="OptionsPanelContents">
        {Object.keys(diagramOptions).map((k, i) => (
          <SchemaOption
            key={`${selectedDiagram}-option-${k}-${i}`}
            optionId={k}
            optionData={diagramOptions[k]}
          />
        ))}
      </div>
    </div>
  )
}

export default OptionsPanel
