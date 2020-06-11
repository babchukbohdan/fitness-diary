import React, { useContext, useState, useEffect } from 'react'
import './Details.scss'
import { Exercise } from './Exercise'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { TodayContext } from '../../context/today/todayContext'
import { ExercisesList } from './ExercisesList/ExercisesList'

export const Details = () => {
  const {state, addExercise, changeValue} = useContext(TodayContext)
  const {
    exercises,
    date,
    note,
    start,
    end,
    weight,
    sleep,
  } = state

  const {addTrainingDay} = useContext(FirebaseContext)

  const [db, setDb] = useState()
  const [showEx, setShowEx] = useState(false)

  // useEffect(() => {

  // }, [showEx])

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


  const submitHandler = (data, path) => {
    console.log('submitting', data);
    addTrainingDay(data, path)
      .then(() => {
        console.log('add training day');
      })
      .catch((e) => {
        console.log('Error server post methos');
      })
  }


  // 2020/5/3



  const inputHandler = (e) => {
    console.log(e.target.name, e.target.value);
    changeValue(e.target.name, e.target.value)
  }



  const dateHandler = (e) => {
    console.log(e.target.value)
  }


  return (
    <div className="details">

      <div className="details__header">
        <ul className="details__list">
          <li className="details__info">
            <img
              className="info__icon icon"
              src="./img/icons/date.svg"
              alt="date"
            />
            {/* Date: */}
            <input
              readOnly
              type="date"
              name="date"
              value={date}
              id=""
              onChange={inputHandler}
            />
          </li>
          <li className="details__info">
            <img
              className="info__icon icon"
              src="./img/icons/weight.svg"
              alt="weight"
            />
            {/* Weight: */}
            <input
              type="number"
              name="weight"
              min="20"
              max="200"
              onChange={inputHandler}
              value={weight}
            />
            kg
            </li>
          <li className="details__info">
            <img
              className="info__icon icon"
              src="./img/icons/sleep.svg"
              alt="sleep"
            />
            {/* Sleep: */}
            <input
              type="number"
              name="sleep"
              min="6"
              max="12"
              onChange={inputHandler}
              value={sleep}

            />
            hours</li>
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
            >
              <img
                className="details__icon icon"
                src="./img/icons/add.svg"
                alt="weight"
              />
              Add exercise
            </button>
          </div>

          {db && showEx && <ExercisesList db={db} onSelectExercise={addExercise} setShowEx={setShowEx} />}

        </div>

        <div className="details__note">
          <h5>Note:</h5>
          <textarea
            name="note"
            onChange={inputHandler}
            value={note}
          ></textarea>
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
          <li className="details__info">
            Start:
            <input
              type="time"
              name="start"
              onChange={inputHandler}
              value={start}
            />
          </li>
          <li className="details__info">
            End:
            <input
              type="time"
              name="end"
              onChange={inputHandler}
              value={end}
            />
          </li>
          <li className="details__info">Duration: 90min</li>
        </ul>
      </div>

    </div>
  )
}
