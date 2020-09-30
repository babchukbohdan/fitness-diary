import React from 'react'
import './Note.scss'

export const Note = ({path, value, changeValue}) => {
  const inputHandler = (e) => {
    changeValue(path, e.target.value)
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
