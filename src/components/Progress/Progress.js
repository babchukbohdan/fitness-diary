import React, { useState, useContext, useEffect } from 'react'
import { LinearChart } from './LinearChart/LinearChart';
import { ExercisesList } from '../Details/ExercisesList/ExercisesList';

import './Progress.scss'
import { getDayString } from '../Month/utils';
import { FirebaseContext } from '../../context/firebase/firebaseContext';


export const Progress = () => {
  const [isExercisesVisible, setIsExercisesVisible] = useState(false)
  const [date, setDate] = useState((new Date(2020, 5)))
  const [exercise, setExercise] = useState({
    name: 'Приседания с штангой на спине',
    muscleGroup: 'legs'
  })


  const {fetchMonth, month} = useContext(FirebaseContext)


  useEffect(() => {
    fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
    // eslint-disable-next-line
  }, [date])




  let ex;
  if (month) {
    ex = month.filter(({exercises}) => exercises.some(ex => {
      return ex.name.name === exercise.name
    })).map(day => {
      return {
        ...day,
        exercises: day.exercises
          .filter(({name}) => name.name === exercise.name)
          .reduce((acc, cur) => acc.concat(cur.sets), [])
          .reduce((acc, cur) => acc.weight > cur.weight ? acc : cur)
      }
    }).map(({date, weight, exercises}) => ({
      date: new Date(date).getTime(),
      dateString: date,
      bodyWeight: weight,
      reps: exercises.reps,
      exerciseWeight: exercises.weight
    })).sort((a, b) => a.date - b.date)

  }



  return (
    <div className="progress wrap">
      <h1 className="progress__title">Progress</h1>
      <section className="progress__filter">
        <div className="filter__item">
          <label
            className="progress__label"
            htmlFor="progress__month"
          >
            Choose month:
          </label>
          <input
            id="progress__month"
            className="progress__input"
            type="month"
            name="month"
            value={getDayString(date)}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
        <div className="filter__item">
          <label
            className="progress__label"
            htmlFor="progress__exercise"
          >
            Choose exercise:
          </label>
          <span
            id="progress__exercise"
            className="progress__input"
            onClick={() => {setIsExercisesVisible(true)}}
          >
            {exercise.name}
          </span>
        </div>
        {
          isExercisesVisible &&
            <ExercisesList
              changeVisible={setIsExercisesVisible}
              onSelectExercise={setExercise}
            />
        }


      </section>
      <section className="progress__chart">
        {
          ex && <LinearChart data={ex} />
        }
      </section>
    </div>
  )
}
