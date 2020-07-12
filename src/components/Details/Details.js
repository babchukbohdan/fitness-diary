import React, { useContext, useState, useEffect } from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

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

export const Details = () => {
  const {fetchMonth, addTrainingDay, month, loading, postingData} = useContext(FirebaseContext)
  const {state, addExercise, changeValue, pushState} = useContext(TodayContext)
  const {exercises, note, start, end} = state

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
          if (todayTraining) pushState({...todayTraining})

        })
    } else {
      const todayTraining = month.filter((day) => {
        return day.date === state.date
      })[0]
      if (todayTraining) pushState({...todayTraining})
    }
  // eslint-disable-next-line
  }, [])


  if (loading) {
    return <Loader />
  }

  return (
    <div className="details wrap">

      <div className="details__header">
        <DetailsInfoList
          items={header}
          state={state}
          changeValue={changeValue}
          showTitle={true}
          showIcon={true}
        />
      </div>

      <div className="details__main">
        <div className="details__exercises" >
          <TransitionGroup component="div">

            {exercises.map((item, i) => (
              <CSSTransition
                key={item.id}
                classNames={'fromUp'}
                timeout={2300}
              >
                <Exercise  exercise={item} />
              </CSSTransition>
            ))}
          </TransitionGroup>


          <AddExercise onClickHandler={() => setShowEx(true)} />

          {showEx &&
          <ExercisesList
            onSelectExercise={addExercise}
            changeVisible={setShowEx}
            visible={showEx}
            closeOnSelect={false}
          />}

        </div>

        <Note value={note} changeValue={changeValue} />

        <Submit value={state} postData={addTrainingDay} loading={postingData} />
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
