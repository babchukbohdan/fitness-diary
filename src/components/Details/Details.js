import React, { useContext, useState, useEffect } from 'react'
import { Exercise } from './Exercise/Exercise'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { TodayContext } from '../../context/today/todayContext'
import { ExercisesList } from './ExercisesList/ExercisesList'
import { DetailsInfoList } from './DetailsInfoList/DetailsInfoList'
import { header, footer } from '../../constants'
import { duration } from './utils'
import { AddExercise } from './AddExercise/AddExercise'
import { Note } from './Note/Note'
import { Submit } from './Submit/Submit'

import './Details.scss'
import { Loader } from '../UI/Loader/Loader'
import { getDayString } from '../Month/utils'

export const Details = () => {
  const {fetchMonth, addTrainingDay, month, loading} = useContext(FirebaseContext)
  const {state, addExercise, changeValue, pushState} = useContext(TodayContext)
  const {exercises, note, start, end} = state


  const [db, setDb] = useState()
  const [showEx, setShowEx] = useState(false)

  useEffect(() => {
    // if (month.length && month[0].date.substr(0, 7) === getDayString(new Date())) return
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

  if (loading) {
    return <Loader />
  }



  return (
    <div className="details">

      <div className="details__header">
        <DetailsInfoList
          items={header}
          state={state}
          changeValue={changeValue}
          showTitle={false}
          showIcon={true}
        />
      </div>

      <div className="details__main">
        <div className="details__exercises">
          {exercises.map((item, i) => {
            return <Exercise key={item.id} exercise={item} />
          })}


          <AddExercise onClickHandler={() => setShowEx(true)} />

          {db && showEx && <ExercisesList db={db} onSelectExercise={addExercise} setShowEx={setShowEx} />}

        </div>

        <Note value={note} changeValue={changeValue} />

        <Submit value={state} postData={addTrainingDay} />
      </div>

      <div className="details__footer">
        <DetailsInfoList
          items={footer}
          state={state}
          changeValue={changeValue}
          showTitle={true}
        >
          <li className="info__item">Duration: {duration(start, end)} min</li>
        </DetailsInfoList>
      </div>

    </div>
  )
}
