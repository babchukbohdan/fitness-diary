import React, { useState, useContext } from 'react'
import { TodayContext } from '../../context/today/todayContext'

export const Set = ({exerciseId, id, index, weight, reps}) => {
  const [state, setState] = useState({weight, reps})
  const {replaceSet} = useContext(TodayContext)

  const inputHandler = (e) => {
    e.persist()
    const key = e.target.name
    const newState = {...state, [key]: e.target.value}
    setState(newState)
    replaceSet(exerciseId, id, newState)
  }

  return (
    <div className="details__set">
      <div className="details__set__num">{index + 1}</div>
      <div className="details__values">
        <div className="details__weight">
          <input
            name="weight"
            type="number"
            min="1"
            value={weight}
            onChange={inputHandler}
          />
          <span>kg</span>
        </div>
        <div className="details__reps">
          <input
            name="reps"
            type="number"
            min="1"
            value={reps}
            onChange={inputHandler}
          />
          <span>reps</span>
        </div>
      </div>
      <div className="details__set__remove">
        <button
          className="details__set__btn"
          onClick={() => replaceSet(exerciseId, id)}
        >
          <img
            className="set__icon icon"
            src="./img/icons/close.svg"
            alt="weight"
          />
          {/* &times; */}
        </button>
      </div>
    </div>
  )
}
