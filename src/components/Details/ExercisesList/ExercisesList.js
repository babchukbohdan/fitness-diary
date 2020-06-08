import React, { useState } from 'react'
import './ExercisesList.scss'

export const ExercisesList = ({db, onSelectExercise, setShowEx}) => {

  const muscleTypes = Object.keys(db.exercises)

  const [muscleGroup, setMuscleGroup] = useState('ноги')

  const radioHandler = (e) => {
    setMuscleGroup(e.target.value)
    console.log(e.target.value)
  }

  const clickHandler = (e) => {
    console.log(e.target.textContent)
    setShowEx(false)
    onSelectExercise(e.target.textContent)
  }

  return (
    <div className="overlay">
      <div className="muscles">
        <div className="muscles__types">
          {
            muscleTypes.map((type, i) => {
              return (
                <label key={type}>
                  <input
                    type="radio"
                    name="muscle"
                    value={type}
                    checked={muscleGroup === type}
                    onChange={radioHandler}
                  /><p>{type}</p>
                </label>
              )
            })
          }
        </div>

        <div className="muscles__exercises">
          <ol>
            {
              db.exercises[muscleGroup].map((exercise, i) =>
              <li
                key ={exercise}
                onClick={clickHandler}
              >{exercise}</li>)
            }
          </ol>
        </div>
      </div>
    </div>
  )
}
