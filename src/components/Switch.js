import { useState } from 'react'

const Switch = ({
  id,
  name,
  defaultValue = false,
  onChange = null,
  title = null,
  disabled = false,
}) => {
  const [isChecked, setChecked] = useState(defaultValue)
  const changeHandler = e => {
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
