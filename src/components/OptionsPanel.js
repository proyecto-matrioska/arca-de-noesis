import { useDispatch, useSelector } from 'react-redux'
import './OptionsPanel.css'
import Switch from './Switch'
import { setDiagramOption, setGeneralDiagramOption } from '../state/uiSlice'

const BooleanOption = ({
  optionId,
  name,
  longDescription,
  value,
  globalOption,
  disabled = false,
}) => {
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
              (globalOption ? setGeneralDiagramOption : setDiagramOption)({
                diagramName: selectedDiagram,
                optionId,
                value: b,
              })
            )
          }
          title={longDescription}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

const SelectOption = ({
  optionId,
  name,
  longDescription,
  value,
  options,
  globalOption,
  disabled = false,
}) => {
  const dispatch = useDispatch()
  const selectedDiagram = useSelector(state => state.ui.selectedDiagram)
  return (
    <div className="SelectOption" title={longDescription}>
      <div>{name}:</div>
      <div>
        <select
          id={`${globalOption ? 'global' : selectedDiagram}-select-${optionId}`}
          name={`${
            globalOption ? 'global' : selectedDiagram
          }-select-${optionId}`}
          className="dropdown-select"
          defaultValue={value}
          onChange={e =>
            dispatch(
              (globalOption ? setGeneralDiagramOption : setDiagramOption)({
                diagramName: selectedDiagram,
                optionId,
                value: e.target.value,
              })
            )
          }
          title={longDescription}
          disabled={disabled}
        >
          {options.map(opt => (
            <option
              key={`${
                globalOption ? 'global' : selectedDiagram
              }-select-${optionId}-${opt.value}`}
              value={opt.value}
            >
              {opt.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

const SchemaOption = ({
  optionId,
  optionData,
  disabled,
  globalOption = false,
}) => {
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
  return (
    <OptionComponent
      optionId={optionId}
      {...optionData}
      disabled={disabled}
      globalOption={globalOption}
    />
  )
}

const OptionsPanel = () => {
  const schemaName = useSelector(state => state.ui.selectedDiagramName)
  const schemaOptions = useSelector(state => state.ui.schemaOptions)
  const generalSchemaOptions = useSelector(
    state => state.ui.generalSchemaOptions
  )
  const selectedDiagram = useSelector(state => state.ui.selectedDiagram)
  const diagramOptions = schemaOptions[selectedDiagram] ?? {}
  return (
    <div className="OptionsPanel">
      <div className="OptionsPanelContents">
        <div>
          <b>General:</b>
        </div>
        {Object.keys(generalSchemaOptions).map((k, i) => (
          <SchemaOption
            key={`generalSchemaOptions-option-${k}-${i}`}
            optionId={k}
            optionData={generalSchemaOptions[k]}
            globalOption={true}
            disabled={
              generalSchemaOptions[k].depends &&
              generalSchemaOptions[generalSchemaOptions[k].depends.element]
                .value !== generalSchemaOptions[k].depends.value
            }
          />
        ))}
        <div>
          <b>{schemaName ? `${schemaName}:` : ''}</b>
        </div>
        {Object.keys(diagramOptions).map((k, i) => (
          <SchemaOption
            key={`${selectedDiagram}-option-${k}-${i}`}
            optionId={k}
            optionData={diagramOptions[k]}
            disabled={
              diagramOptions[k].depends &&
              diagramOptions[diagramOptions[k].depends.element].value !==
                diagramOptions[k].depends.value
            }
          />
        ))}
      </div>
    </div>
  )
}

export default OptionsPanel
