import React, { useContext } from 'react'
import { Set } from '../Set/Set'
import { TodayContext } from '../../../context/today/todayContext'
import './Exercise.scss'
import { Icon } from '../../UI/Icon/Icon'

export const Exercise = ({exercise}) => {

  // const sets = new Array(5).fill('')
  const {sets, id, name} = exercise
  const {removeExercise, addSet} = useContext(TodayContext)

  return (
    <div className="exercise">

      <p className="exercise__name">
        {name.name}
      </p>


      <div className="exercise__container">

        <div className="exercise__sets">
          {
            sets.map((set, i) => {
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

        <div className="exercise__addset">
          <button className="btn" onClick={() => addSet(id)}>
            <Icon name="add set" path="copy.svg" />
            {/* Add<br/>set */}
          </button>
        </div>

      </div>

      <div className="exercise__close">
        <button className="btn" onClick={() => removeExercise(id)}>
          <Icon name="remove exercise" path="bin.svg" />
          {/* Remove<br/>exercise */}
        </button>
      </div>

    </div>
  )
}
