import React from 'react'
import './Note.scss'

export const Note = ({value, changeValue}) => {
  const inputHandler = (e) => {
    changeValue(e.target.name, e.target.value)
  }
  return (
    <div className="note">
      <h5
        className="note__title"
      >Note:</h5>
      <textarea
        className="input"
        name="note"
        onChange={inputHandler}
        value={value}
        spellCheck={false}
      ></textarea>
    </div>
  )
}
