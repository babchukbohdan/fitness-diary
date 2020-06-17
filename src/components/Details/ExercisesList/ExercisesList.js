import React, { useState } from 'react'
import './ExercisesList.scss'

export const ExercisesList = ({db, onSelectExercise, setShowEx}) => {

  const muscleTypes = Object.keys(db.exercises)

  const [muscleGroup, setMuscleGroup] = useState('legs')

  const radioHandler = (e) => {
    setMuscleGroup(e.target.value)
  }

  const clickHandler = (e) => {
    setShowEx(false)
    onSelectExercise({
      name: e.target.textContent,
      muscleGroup
    })
  }

  return (
    <div className="overlay" onClick={(e) => {
      if (e.target.classList.contains('overlay')) {
        setShowEx(false)
      }
    }}>
      <div className="muscles">
        <div className="muscles__types">
          {
            muscleTypes.map((type, i) => {
              const isActive = muscleGroup === type
              return (
                <label key={type} className={isActive ? 'active' : null}>
                  <input
                    type="radio"
                    name="muscle"
                    value={type}
                    checked={isActive}
                    onChange={radioHandler}
                  /><p>{type}</p>
                </label>
              )
            })
          }
        </div>

        <div className="muscles__exercises">
          <ul>
            {
              db.exercises[muscleGroup].map((exercise, i) =>
              <li
                key ={exercise}
                onClick={clickHandler}
              >{exercise}</li>)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
