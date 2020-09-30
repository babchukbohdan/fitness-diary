import React from 'react'
import { useState } from 'react'
import { DeleteBtn } from '../../UI/DeleteBtn/DeleteBtn'


export const Meal = ({ item, changeItem, removeItem, type, index }) => {
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
      <div className="meal__container">
        <label
          htmlFor={item.id}
          className='meal__label'
        ><span className="label-text">{index + 1}</span>
        <input
          name="name"
          id={item.id}
          onChange={inputHandler}
          value={name}
          type="text"
          className="input input--bd-radius--small meal__input"
          autoComplete={'false'}
        />
        </label>
        <label
          htmlFor={item.id + 'a'}
          className='meal__label'
        >
          <span className="label-text">Calories</span>
        <input
          className="input input--bd-radius--small meal__input"
          id={item.id + 'a'}
          name="calorie"
          type="number"
          min={0}
          onChange={(e) => changeItem(item.id, {calorie: e.target.value }, type)}
          value={calorie}
        />
        </label>
        <label
          className='meal__label'
        >
          <span className="label-text">Proteins</span>
        <input
          type="number"
          className="input input--bd-radius--small meal__input"
        />
        </label>
        <label
          className='meal__label'
        >
          <span className="label-text">Fats</span>
        <input
          type="number"
          className="input input--bd-radius--small meal__input"
        />
        </label>
        <label
          className='meal__label'
        >
          <span className="label-text">Carbohydrates</span>
        <input
          type="number"
          className="input input--bd-radius--small meal__input"
        />
        </label>
      </div>

      <div className="exercise__close">
        <DeleteBtn
          onClickHandler={() => removeItem(item.id, type)}
          btnClasses='btn'
          iconClasses="exercise__close icon"
        />
      </div>
    </div>
  )

}
