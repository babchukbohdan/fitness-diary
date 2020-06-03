import React, { useContext, useState } from 'react'
import './Details.scss'
import { Exercise } from './Exercise'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { getDayString } from '../Month/utils'
import { TodayContext } from '../../context/today/todayContext'

export const Details = () => {
  const {state, addExercise, removeExercise} = useContext(TodayContext)
  const exercises = state.exercises

  const {addTrainingDay} = useContext(FirebaseContext)

  const submitHandler = (data, path) => {
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
              onClick={addExercise}
            >Add exercise</button>
          </div>

        </div>

        <div className="details__note">
          <h5>Note:</h5>
          <textarea></textarea>
        </div>

        <div className="details__save">
          <button
            onClick={() => {
              submitHandler({
                date: getDayString(new Date(), true),
                exercises: [
                  {
                    name: 'pull-up',
                    sets: [
                      {
                        weight: 0,
                        reps: 12
                      },
                      {
                        weight: 0,
                        reps: 10
                      }
                    ]
                  },
                  {
                    name: 'banch-press',
                    sets: [
                      {
                        weight: 100,
                        reps: 12
                      },
                      {
                        weight: 120,
                        reps: 10
                      }
                    ]
                  },
                ],
                note: '',
                start: '',
                end: '',
                weight: '70kg',
                sleep: ''
              }, '2020/6')
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
