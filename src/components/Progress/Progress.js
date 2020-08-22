import React, { useState, useContext, useEffect } from 'react'
import { LinearChart } from './LinearChart/LinearChart';
// import { Chart } from 'primereact/chart';
import { Chart } from 'primereact/chart';
import './Progress.scss'
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { DateInput } from '../Month/DateInput/DateInput';
import {Message} from 'primereact/message';
import { SelectMuscle } from '../UI/SelectMuscle/SelectMuscle';

export const Progress = () => {
  const [date, setDate] = useState((new Date(2020, 5)))
  const [exercise, setExercise] = useState({
    name: 'Приседания с штангой на спине',
    muscleGroup: 'legs'
  })
  const [dataForChart, setDataForChart] = useState(null)


  const {fetchMonth, month} = useContext(FirebaseContext)


  useEffect(() => {
    setDataForChart(null)
    fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
    // eslint-disable-next-line
  }, [date])

  useEffect(() => {
    const ex = month.filter(({exercises}) => exercises.some(ex => {
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
    console.log(ex, 'data to chart')
    setDataForChart(ex)
  }, [exercise, month])


  // let ex;
  // if (month) {

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#4bc0c0'
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#565656'
          }
      ]
  };
  // }

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

          {/* <input
            id="progress__month"
            className="progress__input"
            type="month"
            name="month"
            value={getDayString(date)}
            onChange={(e) => setDate(new Date(e.target.value))}
          /> */}
          </label>
            <DateInput setDate={setDate} date={date} id='progress__month' />
        </div>
        <div className="filter__item">
          <label
            className="progress__label"
            htmlFor="progress__exercise"
          >
            Choose exercise:
          </label>
          <SelectMuscle
            closeOnSelect={true}
            showExerciseInBtn={true}
            onSelectExercise={setExercise}
            btnId="progress__exercise"
            btnClasses='progress__input btn btn--border'
            btnText={exercise.name}
          />
        </div>

      </section>
      <section className="progress__chart">
        {
          dataForChart
            ? <LinearChart data={dataForChart} />
            : <Message severity="warn" text="Yoy haven't training in this month"/>
        }
        <Chart data={data} type="line" />
      </section>
    </div>
  )
}
