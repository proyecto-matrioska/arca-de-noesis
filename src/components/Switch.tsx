import React, { FC, useState } from 'react'

interface ISwitchProps {
  id?: string
  name?: string
  defaultValue?: boolean
  onChange?: (value: boolean) => void
  title?: string
  disabled?: boolean
}

const Switch: FC<ISwitchProps> = ({
  id,
  name,
  defaultValue = false,
  onChange,
  title,
  disabled = false,
}) => {
  const [isChecked, setChecked] = useState<boolean>(defaultValue)
  const changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = e => {
    setChecked(e.target.checked)
    if (onChange) onChange(e.target.checked)
  }
  return (
    <div
      className={`Switch ${isChecked ? 'toggled' : ''} ${
        disabled ? 'disabled' : ''
      }`}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={isChecked}
        onChange={changeHandler}
        title={title}
        disabled={disabled}
      />
    </div>
  )
}

export default Switch
