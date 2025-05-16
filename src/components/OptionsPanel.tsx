import React from 'react'
import Switch from './Switch'
import { useAppDispatch, useAppSelector } from '../state/store'
import {
  SchemaOption,
  setDiagramOption,
  setGeneralDiagramOption,
} from '../state/uiSlice'
import './OptionsPanel.css'

export interface IBooleanOptionProps {
  optionId: string
  name: string
  longDescription: string
  value: boolean
  globalOption: boolean
  disabled: boolean
}

const BooleanOption = ({
  optionId,
  name,
  longDescription,
  value,
  globalOption,
  disabled = false,
}: IBooleanOptionProps) => {
  const dispatch = useAppDispatch()
  const selectedDiagram = useAppSelector(state => state.ui.selectedDiagram)
  return (
    <div className="BooleanOption" title={longDescription}>
      <div>{name}:</div>
      <div>
        <Switch
          id={`${selectedDiagram}-checkbox-${optionId}`}
          name={`${selectedDiagram}-checkbox-${optionId}`}
          defaultValue={value}
          onChange={b => {
            if (globalOption) {
              dispatch(
                setGeneralDiagramOption({
                  optionId,
                  value: b,
                })
              )
            } else if (selectedDiagram) {
              dispatch(
                setDiagramOption({
                  diagramName: selectedDiagram,
                  optionId,
                  value: b,
                })
              )
            }
          }}
          title={longDescription}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export interface ISelectOptionProps {
  optionId: string
  name: string
  longDescription: string
  value: string
  options: { name: string; value: string }[]
  globalOption: boolean
  disabled?: boolean
}

const SelectOption = ({
  optionId,
  name,
  longDescription,
  value,
  options,
  globalOption,
  disabled = false,
}: ISelectOptionProps) => {
  const dispatch = useAppDispatch()
  const selectedDiagram = useAppSelector(state => state.ui.selectedDiagram)
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
          onChange={e => {
            if (globalOption) {
              dispatch(
                setGeneralDiagramOption({
                  optionId,
                  value: e.target.value,
                })
              )
            } else if (selectedDiagram) {
              dispatch(
                setDiagramOption({
                  diagramName: selectedDiagram,
                  optionId,
                  value: e.target.value,
                })
              )
            }
          }}
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

interface IOptionProps {
  optionId: string
  optionData: SchemaOption
  disabled?: boolean
  globalOption?: boolean
}

const Option = ({
  optionId,
  optionData,
  disabled,
  globalOption = false,
}: IOptionProps) => {
  const { type } = optionData
  let OptionComponent: React.ComponentType<any>
  switch (type) {
    case 'bool':
      OptionComponent = BooleanOption
      break
    case 'select':
      OptionComponent = SelectOption
      break
    default:
      OptionComponent = () => <div />
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
  const schemaName = useAppSelector(state => state.ui.selectedDiagramName)
  const schemaOptions = useAppSelector(state => state.ui.schemaOptions)
  const generalSchemaOptions = useAppSelector(
    state => state.ui.generalSchemaOptions
  )
  const selectedDiagram = useAppSelector(state => state.ui.selectedDiagram)
  const diagramOptions = selectedDiagram ? schemaOptions[selectedDiagram] : {}
  return (
    <div className="OptionsPanel">
      <div className="OptionsPanelContents">
        <div>
          <b>General:</b>
        </div>
        {Object.keys(generalSchemaOptions).map((k, i) => (
          <Option
            key={`generalSchemaOptions-option-${k}-${i}`}
            optionId={k}
            optionData={generalSchemaOptions[k]}
            globalOption={true}
            disabled={
              generalSchemaOptions[k].depends &&
              generalSchemaOptions[
                generalSchemaOptions[k].depends?.element || ''
              ].value !== generalSchemaOptions[k].depends?.value
            }
          />
        ))}
        <div>
          <b>{schemaName ? `${schemaName}:` : ''}</b>
        </div>
        {Object.keys(diagramOptions).map((k, i) => (
          <Option
            key={`${selectedDiagram}-option-${k}-${i}`}
            optionId={k}
            optionData={diagramOptions[k]}
            disabled={
              diagramOptions[k].depends &&
              diagramOptions[diagramOptions[k].depends?.element || ''].value !==
                diagramOptions[k].depends?.value
            }
          />
        ))}
      </div>
    </div>
  )
}

export default OptionsPanel
