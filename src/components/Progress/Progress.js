import React, { useState, useContext, useEffect } from 'react'
import { LinearChart } from './LinearChart/LinearChart';
import { ExercisesList } from '../Details/ExercisesList/ExercisesList';

import './Progress.scss'
import { getDayString } from '../Month/utils';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
const data = [

      {
        "date": new Date('2020-06-01').getTime(),
        "weight": 70.850
      },
      {
        "date": new Date('2020-06-04').getTime(),
        "weight": 70.950
      },
      {
        "date": new Date('2020-06-05').getTime(),
        "weight": 70.950
      },
      {
        "date": new Date('2020-06-07').getTime(),
        "weight": 71
      },
      {
        "date": new Date('2020-06-11').getTime(),
        "weight": 71.500
      },
      {
        "date": new Date('2020-06-17').getTime(),
        "weight": 71.850
      },
      {
        "date": new Date('2020-06-22').getTime(),
        "weight": 72.400
      },
      {
        "date": new Date('2020-06-27').getTime(),
        "weight": 72.800
      },
      {
        "date": new Date('2020-06-29').getTime(),
        "weight": 72.400
      },
      {
        "date": new Date('2020-06-30').getTime(),
        "weight": 70.850
      }
]



export const Progress = () => {
  const [isExercisesVisible, setIsExercisesVisible] = useState(false)
  const [date, setDate] = useState((new Date()))
  const [exercise, setExercise] = useState({
    name: 'Приседания с штангой на спине',
    muscleGroup: ''
  })


  const {fetchMonth, month} = useContext(FirebaseContext)


  useEffect(() => {
    fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
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
      weight,
      reps: exercises.reps,
      maxWeight: exercises.weight
    })).sort((a, b) => a.date - b.date)

    console.log(ex)
    // ex = month.flatMap(({date, exercises}) => {

    //   const a = exercises.map(({sets}) => {
    //     const maxWeightSet = sets.reduce((acc, cur) => {
    //       return acc.weight > cur.weight ? acc : cur
    //     })

    //   return {
    //     date,
    //     exercises: exercises
    //   }
    // })

    // ex = ex.filter(ex => ex.name.name === exercise.name)

    // ex = ex.map(({sets, id}) => {
    //   const maxWeightSet = sets.reduce((acc, cur) => {
    //     return acc.weight > cur.weight ? acc : cur
    //   })

    //   return {
    //     date: getDayString(new Date(id), true),
    //     set: maxWeightSet
    //   }
    // })
  }



  return (
    <div className="progress">
      <h1>Progress</h1>
      <section>
        <label>
          Choose month
          <input
            type="month"
            name="month"
            value={getDayString(date)}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </label>
        <br/>
        <button
          onClick={() => {setIsExercisesVisible(true)}}
        >
          Choose exercise
        </button>
        {
          isExercisesVisible &&
            <ExercisesList
              changeVisible={setIsExercisesVisible}
              onSelectExercise={setExercise}
            />
        }
        <span>{exercise.name}</span>

        {/* <pre>
          {
            JSON.stringify(month, null, 2)
          }
        </pre> */}

      </section>
      <div className="chart">
        {
          ex && <LinearChart data={ex} />
        }
      </div>
    </div>
  )
}
