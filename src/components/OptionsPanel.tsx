import React from 'react'
import Switch from './Switch'
import { useAppDispatch, useAppSelector } from '../state/store'
import {
  setDiagramOption,
  setGeneralOption,
  selectActiveTab,
  schemaNames,
} from '../state/dialecticsSlice'
import { SchemaOption } from '../state/uiOptions'
import './OptionsPanel.css'
import { useTranslation } from 'react-i18next'

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
  const activeTab = useAppSelector(selectActiveTab)
  const selectedDiagram = activeTab.selectedDiagram
  const { t } = useTranslation()
  return (
    <div className="BooleanOption" title={longDescription}>
      <div>{t(name)}:</div>
      <div>
        <Switch
          id={`${globalOption ? 'global' : selectedDiagram}-checkbox-${optionId}`}
          name={`${globalOption ? 'global' : selectedDiagram}-checkbox-${optionId}`}
          value={value}
          onChange={b => {
            if (globalOption) {
              dispatch(setGeneralOption({ optionId, value: b }))
            } else if (selectedDiagram) {
              dispatch(setDiagramOption({ diagramName: selectedDiagram, optionId, value: b }))
            }
          }}
          title={t(longDescription)}
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
  const activeTab = useAppSelector(selectActiveTab)
  const selectedDiagram = activeTab.selectedDiagram
  const { t } = useTranslation()
  return (
    <div className="SelectOption" title={t(longDescription)}>
      <div>{t(name)}:</div>
      <div>
        <select
          id={`${globalOption ? 'global' : selectedDiagram}-select-${optionId}`}
          name={`${globalOption ? 'global' : selectedDiagram}-select-${optionId}`}
          className="dropdown-select"
          value={value}
          onChange={e => {
            if (globalOption) {
              dispatch(setGeneralOption({ optionId, value: e.target.value }))
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
          title={t(longDescription)}
          disabled={disabled}
        >
          {options.map(opt => (
            <option
              key={`${globalOption ? 'global' : selectedDiagram}-select-${optionId}-${opt.value}`}
              value={opt.value}
            >
              {t(opt.name)}
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
  const activeTab = useAppSelector(selectActiveTab)
  const activeTabId = useAppSelector(state => state.dialectics.activeTabId)
  const selectedDiagram = activeTab.selectedDiagram
  const generalOptions = activeTab.generalOptions
  const diagramOptions = selectedDiagram ? activeTab.schemaOptions[selectedDiagram] : {}
  const schemaName = selectedDiagram ? schemaNames[selectedDiagram] : null
  const { t } = useTranslation()

  return (
    <div className="OptionsPanel">
      <div className="OptionsPanelContents">
        <div>
          <b>{t('General')}: </b>
        </div>
        {Object.keys(generalOptions).map((k, i) => (
          <Option
            key={`${activeTabId}-generalOption-${k}-${i}`}
            optionId={k}
            optionData={generalOptions[k]}
            globalOption={true}
            disabled={
              generalOptions[k].depends &&
              generalOptions[generalOptions[k].depends?.element || '']?.value !==
                generalOptions[k].depends?.value
            }
          />
        ))}
        <div>
          <b>{schemaName ? `${t(schemaName)}:` : ''}</b>
        </div>
        {Object.keys(diagramOptions).map((k, i) => (
          <Option
            key={`${activeTabId}-${selectedDiagram}-option-${k}-${i}`}
            optionId={k}
            optionData={diagramOptions[k]}
            disabled={
              diagramOptions[k].depends &&
              diagramOptions[diagramOptions[k].depends?.element || '']?.value !==
                diagramOptions[k].depends?.value
            }
          />
        ))}
      </div>
    </div>
  )
}

export default OptionsPanel
