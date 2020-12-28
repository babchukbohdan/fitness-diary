import React, { useState, useContext, useEffect } from 'react'
import { LinearChart } from './LinearChart/LinearChart';
// import { Chart } from 'primereact/chart';
import './Progress.scss'
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { DateInput } from '../Month/DateInput/DateInput';
import { SelectMuscle } from '../UI/SelectMuscle/SelectMuscle';
import { PieChartCalories } from './PieChart/PieChart';
import { getCaloriesDataForPieChart, getDataForChartBy } from './utils';
import { getDayString } from '../Month/utils';
import { ReactComponent as DeleteSetIcon } from "../../images/close.svg";

export const Progress = () => {
  const { fetchMonth, month, loading } = useContext(FirebaseContext)
  const [exercises, setExercises] = useState([{
    name: 'Тяга штанги в наклоне',
    muscleGroup: 'back',
    withReps: true,
    withBodyWeight: false
  }])

  const isWithBodyWeight = exercises[0]?.withBodyWeight

  // console.log(exercises, 'exercises')
  const [dataForChart, setDataForChart] = useState([])
  const [dataCaloriesForPieChart, setDataCaloriesForPieChart] = useState([])

  const currentDate = month.length ? new Date(month[0].info.date) : new Date()
  const [date, setDate] = useState(currentDate)

  const onSelectExercise = (exercise) => {
    if (!exercises.some(ex => ex.name === exercise.name)) {
      const ex = { ...exercise, withReps: true }
      setExercises(state => [...state, ex])
    }
  }
  const onDeleteExercise = (val) => {
    console.log(val, 'val')
    const isDeletingReps = !!val.match(/\(reps\)/g)
    let exercise = val.replace(/\s\(reps\)/g, '')
    if (val === 'bodyWeight') {
      setExercises(state => state.map(ex => ({ ...ex, withBodyWeight: false })))
    } else if (isDeletingReps) {
      setExercises(state => state.map(ex => ex.name === exercise ? ({ ...ex, withReps: false }) : ex))
    } else {
      setExercises(state => state.filter(ex => ex.name !== val))
    }
  }


  useEffect(() => {
    // setDataForChart([])
    setDataCaloriesForPieChart([])
    const geData = async () => {
      if (!(month.length && month[0].info.date.substr(0, 7) === getDayString(date))) {
        await fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
      }
    }

    geData()

    // eslint-disable-next-line
  }, [date])

  useEffect(() => {
    setDataForChart(null)  // change TEST

    setDataForChart(getDataForChartBy(month, exercises))
    setDataCaloriesForPieChart(getCaloriesDataForPieChart(month))

  }, [exercises, month])

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

        {

          Object.keys(dataForChart.reduce((acc, cur) => ({ ...acc, ...cur }), {}))
            .filter(val => val !== 'date')
            .filter(val => val !== 'bodyWeight')
            .map(val => (
              <div
                key={val}
                className="exercise-list"
              >
                <span
                  className='input text'
                >
                  <span className="name">{val}</span>

                  <button
                    className="btn btn--outlined"
                    onClick={() => onDeleteExercise(val)}
                  >
                    <DeleteSetIcon
                      className="icon icon--small"
                      alt="delete exercise"
                    />
                  </button>
                </span>
              </div>
            ))
        }
        <div className="filter__item">
          {/* <label
            className="progress__label"
            htmlFor="progress__exercise"
          >
            Choose exercise:
          </label> */}
          <SelectMuscle
            closeOnSelect={true}
            // onSelectExercise={setExercise}
            onSelectExercise={onSelectExercise}
            btnId="progress__exercise"
            btnClasses='progress__input btn btn--border'
            btnText={`Add exercise`}
            showExerciseInBtn={false}
          // btnText={exercise.name}
          />
          <button
            className='progress__input btn btn--border'
            type='button'
            onClick={() => {
              setExercises(state => state.map(ex => ({ ...ex, withBodyWeight: !isWithBodyWeight })))
            }}
          >
            {
              (isWithBodyWeight) ? 'Remove ' : 'Add '
            }
            body weight
          </button>
        </div>


      </section>

      <section className="progress__chart pie">
        <h2>Total callories per month</h2>
        <PieChartCalories
          data={dataCaloriesForPieChart}
          loading={loading}
          width={'100%'}
          height={300}
        />
      </section>

      <section className="progress__chart">
        <LinearChart
          data={dataForChart}
          loading={loading}
        />
      </section>

      {/* <section className="progress__chart">
          <WeightCaloriesChart
            data={dataForWeightCaloriesChart}
          />
        </section> */}
    </div>
  )
}
