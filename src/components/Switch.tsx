import React, { FC, useState } from 'react'

interface ISwitchProps {
  id?: string
  name?: string
  defaultValue?: boolean
  value?: boolean
  onChange?: (value: boolean) => void
  title?: string
  disabled?: boolean
}

const Switch: FC<ISwitchProps> = ({
  id,
  name,
  defaultValue = false,
  value,
  onChange,
  title,
  disabled = false,
}) => {
  const controlled = value !== undefined
  const [isChecked, setChecked] = useState<boolean>(controlled ? value : defaultValue)

  const changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = e => {
    if (!controlled) setChecked(e.target.checked)
    if (onChange) onChange(e.target.checked)
  }

  const checked = controlled ? value : isChecked

  return (
    <div
      className={`Switch ${checked ? 'toggled' : ''} ${
        disabled ? 'disabled' : ''
      }`}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={changeHandler}
        title={title}
        disabled={disabled}
      />
    </div>
  )
}

export default Switch
