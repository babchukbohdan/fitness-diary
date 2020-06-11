import React, { useContext, useState } from 'react'
import { Set } from './Set'
import { TodayContext } from '../../context/today/todayContext'

export const Exercise = ({exercise}) => {

  // const sets = new Array(5).fill('')
  const {sets, id} = exercise
  const {removeExercise, addSet, replaceSet} = useContext(TodayContext)

  return (
    <div className="details__exercise">

      <p className="details__select">
        {exercise.name}
      </p>


      <div className="details__container">

        <div className="details__sets">
          {
            sets.map((set, i) => {
              // console.log(set.id, 'setID');
              return <Set
                weight={set.weight}
                reps={set.reps}
                index={i}
                key={set.id}
                id={set.id}
                exerciseId={id}
              />
            })
          }
        </div>

        <div className="details__addset">
          <button
            onClick={() => addSet(id)}
          >
            <img
              className="details__icon icon"
              src="./img/icons/copy.svg"
              alt="weight"
            />
            {/* Add<br/>set */}
          </button>
        </div>

      </div>

      <div className="details__close">
        <button
          onClick={() => removeExercise(id)}
        >
          <img
              className="details__icon icon"
              src="./img/icons/bin.svg"
              alt="weight"
            />
          {/* Remove<br/>exercise */}
        </button>
      </div>

    </div>
  )
}
