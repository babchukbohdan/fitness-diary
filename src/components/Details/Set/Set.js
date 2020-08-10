import React, { useState, useContext } from 'react'
import { TodayContext } from '../../../context/today/todayContext'
import { ReactComponent as DeleteSetIcon } from "../../../images/close.svg";
import './Set.scss'

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
    <div className="set">
      <div className="set__num">{index + 1}</div>
      <div className="set__values">

        <div className="set__weight">
          <input
          className="input"
            name="weight"
            type="number"
            min="1"
            value={weight}
            onChange={inputHandler}
          />
          <span>kg</span>
        </div>

        <div className="set__reps">
          <input
          className="input"
            name="reps"
            type="number"
            min="1"
            value={reps}
            onChange={inputHandler}
          />
          <span>reps</span>
        </div>

      </div>

      <div className="set__remove">
        <button
          className="set__btn"
          onClick={() => replaceSet(exerciseId, id)}
        >
          <DeleteSetIcon
            className="set__icon icon"
            src="./img/icons/close.svg"
            alt="delete set"
          />
          {/* &times; */}
        </button>
      </div>

    </div>
  )
}
