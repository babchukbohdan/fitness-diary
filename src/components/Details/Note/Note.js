import React from 'react'
import './Note.scss'

export const Note = ({value, changeValue}) => {
  const inputHandler = (e) => {
    changeValue(e.target.name, e.target.value)
  }
  return (
    <div className="note">
      <h5>Note:</h5>
      <textarea
        name="note"
        onChange={inputHandler}
        value={value}
      ></textarea>
    </div>
  )
}
