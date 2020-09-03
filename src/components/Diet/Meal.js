import React from 'react'
import { useState } from 'react'


export const Meal = ({ item, changeItem, removeItem, type }) => {
  const {name, calorie} = item
  const [state, setState] = useState({name, calorie})

  const inputHandler = (e) => {
    const key = e.target.name
    const newState = {...state, [key]: e.target.value}
    setState(newState)
    changeItem(item.id, newState, type)
  }


  return (
    <div className="exercise">
      <label htmlFor={item.id}>Meel</label>
      <input
        name="name"
        id={item.id}
        onChange={inputHandler}
        value={name}
        type="text"
        className="input"
        autoComplete={'false'}
      />
      <label htmlFor={item.id + 'a'}>Calories</label>
      <input
        name="calorie"
        id={item.id + 'a'}
        onChange={(e) => changeItem(item.id, {calorie: e.target.value }, type)}
        value={calorie}
        type="number"
        className="input"
      />
      <button
        className="btn btn--border"
        onClick={e => removeItem(item.id, type)}
        type="button"
      >delete meal</button>
    </div>
  )

}
