import React, { useState, useEffect } from 'react'
import {CSSTransition} from 'react-transition-group'
import { ReactComponent as CloseIcon } from "../../../images/close.svg";

import './ExercisesList.scss'

export const ExercisesList = ({onSelectExercise, changeVisible, closeOnSelect}) => {


  const [muscleGroup, setMuscleGroup] = useState('legs')
  const [muscleGroups, setMuscleGroups] = useState(null)
  const [db, setDb] = useState(null)

  useEffect(() => {
    const getJson = async () => {
      console.log('fetching exercises list')
      const response = await fetch('./exercises.json', {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()

      setDb(data)
      setMuscleGroups(Object.keys(data.exercises))
    }
    getJson()
  }, [])


  const radioHandler = (e) => {
    setMuscleGroup(e.target.value)
  }

  const clickHandler = (e) => {
    if (closeOnSelect) {
      changeVisible(false)
    }
    // changeVisible(false)
    onSelectExercise({
      name: e.target.textContent,
      muscleGroup
    })
  }

  if (!db || !muscleGroups) {
    return null
  }


  return (
    <CSSTransition
      in={!(!db || !muscleGroups)}
      timeout={800}
      classNames={'fromUp'}
    >
      <div className="overlay" onClick={(e) => {
        if (e.target.classList.contains('overlay')) {
          changeVisible(false)
        }
      }}>
        <div className="muscles">
          <button
            className="btn overlay__btn"
            onClick={() => changeVisible(false)}
          >
            <CloseIcon className="icon" />
          </button>
          <div className="muscles__types">
            {
              muscleGroups.map((type, i) => {
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
    </CSSTransition>
  )
}
