import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ReactComponent as CloseIcon } from "../../../images/close.svg";

import './SelectMuscle.scss'

export const SelectMuscle = ({btnId = '', btnClasses, showExerciseInBtn = false, onSelectExercise, closeOnSelect = true, btnText = 'Choose Exercise'}) => {


  const [db, setDb] = useState(null)
  const [muscleGroups, setMuscleGroups] = useState(null)
  const [activeMuscleGroup, setActiveMuscleGroup] = useState('legs')
  const [choosenExercise, setChoosenExercise] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let isUnmounted = false
    const getJson = async () => {
      const response = await fetch('./exercises.json', {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()
      if (!isUnmounted) {
        setDb(data)
        setMuscleGroups(Object.keys(data.exercises))
      }
    }
    getJson()

    return () => {
      isUnmounted = true
    }
  }, [])


  const radioHandler = (e) => {
    setActiveMuscleGroup(e.target.value)
  }

  const chooseHandler = (e) => {
    if (closeOnSelect) {
      setIsVisible(false)
    }
    // changeVisible(false)
    setChoosenExercise(e.target.textContent)

    onSelectExercise({
      name: e.target.textContent,
      muscleGroup: activeMuscleGroup
    })
  }

  const ExercisesListing = () => {
    return (
      <CSSTransition
        in={isVisible}
        timeout={500}
        classNames="showlist"
        unmountOnExit
      >


      <div className="overlay" onClick={(e) => {
        if (e.target.classList.contains('overlay')) {
          setIsVisible(false)
        }
      }}>
        <div className="muscles">
          <button
            className="btn overlay__btn"
            onClick={() => setIsVisible(false)}
          >
            <CloseIcon className="icon" />
          </button>
          <div className="muscles__types">
            {
              muscleGroups && muscleGroups.map((type, i) => {
                const isActive = activeMuscleGroup === type
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
                db && db.exercises[activeMuscleGroup].map((exercise, i) =>
                <li
                  key ={exercise}
                  onClick={chooseHandler}
                >{exercise}</li>)
              }
            </ul>
          </div>
        </div>

      </div>
      </CSSTransition>
    )
  }

  return (
    <>
      <button
        id={btnId}
        className={btnClasses}
        onClick={() => setIsVisible(true)}
      >
        {showExerciseInBtn ? choosenExercise || btnText : btnText}
      </button>

      {isVisible && <ExercisesListing />}
    </>
  )
}
