import React, { useContext, useState, useEffect } from 'react'
import { Exercise } from './Exercise'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { TodayContext } from '../../context/today/todayContext'
import { ExercisesList } from './ExercisesList/ExercisesList'
import { DetailsInfoList } from './DetailsInfoList/DetailsInfoList'
import { header, footer } from '../../constants'
import { duration } from './utils'
import './Details.scss'


export const Details = () => {
  const {state, addExercise, changeValue, pushState} = useContext(TodayContext)
  const {exercises, note, start, end} = state

  const {fetchMonth, addTrainingDay, month} = useContext(FirebaseContext)

  const [db, setDb] = useState()
  const [showEx, setShowEx] = useState(false)

  useEffect(() => {
    if (!month.length) {
      const date = new Date(Date.parse(state.date))
      fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
        .then(res => {
          const todayTraining = res.filter((day) => {
            return day.date === state.date
          })[0]
          console.log(todayTraining, 'todayTraining');
          if (todayTraining) pushState({...todayTraining})

        })
    } else {
      const todayTraining = month.filter((day) => {
        return day.date === state.date
      })[0]
      if (todayTraining) pushState({...todayTraining})
    }

  }, [])

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
    addTrainingDay(data, path)
      .then(() => {
        console.log('add training day');
      })
      .catch((e) => {
        console.log('Error server post methos');
      })
  }

  const inputHandler = (e) => {
    changeValue(e.target.name, e.target.value)
  }

  return (
    <div className="details">

      <div className="details__header">
        <DetailsInfoList
          items={header}
          state={state}
          changeValue={changeValue}
          showTitle={false}
        />
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
        <DetailsInfoList
          items={footer}
          state={state}
          changeValue={changeValue}
          showTitle={true}
        >
          <li className="details__info">Duration: {duration(start, end)} min </li>
        </DetailsInfoList>
      </div>

    </div>
  )
}
