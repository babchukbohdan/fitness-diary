import React, { useContext } from 'react'
import { Set } from './Set'
import { TodayContext } from '../../context/today/todayContext'

export const Exercise = ({exercise}) => {

  // const sets = new Array(5).fill('')
  const {sets, id} = exercise
  const {removeExercise, addSet, removeSet} = useContext(TodayContext)
  return (
    <div className="details__exercise">

      <select className="details__select" name="">
        <option value="exercise01">exercise01</option>
        <option value="exercise02">exercise02</option>
        <option value="exercise03">exercise03</option>
        <option value="exercise04">exercise04</option>
        <option value="exercise05">exercise05</option>
      </select>


      <div className="details__container">

        <div className="details__sets">
          {
            sets.map((set, i) =>
              <Set
                index={i}
                key={set.id}
                onRemove={() => {removeSet(id, i)}}
              />)
          }
        </div>

        <div className="details__addset">
          <button
            onClick={() => addSet(id, {
              weight: 100,
              reps: 8,
              id: Date.now()
            })}
          >Add<br/>set</button>
        </div>

      </div>

      <div className="details__close">
        <button
          onClick={() => removeExercise(id)}
        >Remove<br/>exercise</button>
      </div>

    </div>
  )
}
