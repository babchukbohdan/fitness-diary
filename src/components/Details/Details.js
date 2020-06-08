import React, { useContext, useState, useEffect } from 'react'
import './Details.scss'
import { Exercise } from './Exercise'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { getDayString } from '../Month/utils'
import { TodayContext } from '../../context/today/todayContext'
import { ExercisesList } from './ExercisesList/ExercisesList'

export const Details = () => {
  const {state, addExercise} = useContext(TodayContext)
  const {exercises} = state

  const {addTrainingDay} = useContext(FirebaseContext)

  const [db, setDb] = useState()
  const [showEx, setShowEx] = useState(false)

  useEffect(() => {

  }, [showEx])

  useEffect(() => {

    const getJson = async () => {
      const response = await fetch('./exercises.json', {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()

      setDb(data)
    }
    getJson()
  }, [])

  console.log(db, 'db');

  const submitHandler = (data, path) => {
    console.log(data, 'submitting to ', path);
    addTrainingDay(data, path)
      .then(() => {
        console.log('add training day');
      })
      .catch((e) => {
        console.log('Error server post methos');
      })
  }


  // 2020/5/3







  const dateHandler = (e) => {
    console.log(e.target.value)
  }


  return (
    <div className="details">

      <div className="details__header">
        <ul className="details__list">
          <li className="details__info">Date:
            <input
              readOnly
              type="date"
              name="date"
              value={getDayString(new Date(), true)}
              id=""
              onClick={dateHandler}
            />
          </li>
          <li className="details__info">Weight: 70kg</li>
          <li className="details__info">Sleep: 9 hours</li>
        </ul>
      </div>

      <div className="details__main">
        <div className="details__exercises">
          {exercises.map((item, i) => {
            return <Exercise key={item.id} exercise={item} />
          })}

          <div className="details__addexercise">
            <button
              onClick={() => {setShowEx(true)}}
            >Add exercise</button>
          </div>

          {db && showEx && <ExercisesList db={db} onSelectExercise={addExercise} setShowEx={setShowEx} />}

        </div>

        <div className="details__note">
          <h5>Note:</h5>
          <textarea></textarea>
        </div>

        <div className="details__save">
          <button
            onClick={() => {
              submitHandler(state, '2020/6')
            }}
          >Save</button>
        </div>
      </div>

      <div className="details__footer">
        <ul className="details__list">
          <li className="details__info">Start: 17:00</li>
          <li className="details__info">End: 18:30</li>
          <li className="details__info">Duration: 90min</li>
        </ul>
      </div>

    </div>
  )
}
