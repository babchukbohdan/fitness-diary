import React, { useState, useContext, useEffect } from 'react'
import { LinearChart } from './LinearChart/LinearChart';
// import { Chart } from 'primereact/chart';
import { Chart } from 'primereact/chart';
import './Progress.scss'
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { DateInput } from '../Month/DateInput/DateInput';
import {Message} from 'primereact/message';
import { SelectMuscle } from '../UI/SelectMuscle/SelectMuscle';
import { PieChartCalories } from './PieChart/PieChart';

export const Progress = () => {
  const [date, setDate] = useState((new Date(2020, 8)))
  const [exercise, setExercise] = useState({
    name: 'Приседания с штангой на спине',
    muscleGroup: 'legs'
  })
  const [dataForChart, setDataForChart] = useState(null)
  const [dataForChart2, setDataForChart2] = useState(null)

  console.log(dataForChart, 'dataForChart')
  console.log(dataForChart2, 'dataForChart2')
  const {fetchMonth, month} = useContext(FirebaseContext)


  useEffect(() => {
    fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
    // eslint-disable-next-line
  }, [date])

  useEffect(() => {
    let ex = month.filter(day => !!day?.exercises)
    console.log('filtred month', ex)
    ex = ex.filter(({exercises}) => exercises.some(ex => {
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
    const ex2 = getData(ex)
    setDataForChart(ex)
    setDataForChart2(ex2)


  }, [exercise, month])


  function getData(dataForChart) {
    const labels = dataForChart.map(val => {
      const date = new Date(val.date)
      date.setHours(0)
      // console.log(date, 'date');
      return date
    })
    const bodyWeight = dataForChart.map(val => {
      return val.bodyWeight
    })
    const exerciseWeight = dataForChart.map(val => {
      return val.exerciseWeight
    })
    const reps = dataForChart.map(val => {
      return val.reps
    })
    const data = {
      labels,
      datasets: [

        {
          label: 'bodyWeight',
          data: bodyWeight,
          fill: false,
          borderColor: '#82ca9d',
          pointBackgroundColor: '#82ca9d',
          tooltips: {
            backgroundColor: '#82ca9d',
          }
        },
        {
          label: 'exerciseWeight',
          data: exerciseWeight,
          fill: false,
          borderColor: '#8884d8',
          pointBackgroundColor: '#8884d8',
          tooltips: {
            backgroundColor: '#8884d8',
          }
        },
        {
          label: 'reps',
          data: reps,
          fill: false,
          borderColor: '#d88484',
          pointBackgroundColor: '#d88484',
          tooltips: {
            backgroundColor: '#d88484',
          }
        },

      ]
    }
    console.log(data)
    return data
  }

  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //       {
  //         label: 'First Dataset',
  //         data: [65, 59, 80, 81, 56, 55, 40],
  //         fill: false,
  //         borderColor: '#4bc0c0'
  //       },
  //       {
  //         label: 'Second Dataset',
  //         data: [28, 48, 40, 19, 86, 27, 90],
  //         fill: false,
  //         borderColor: '#565656'
  //       }
  //   ]
  // };

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
          month
          ? <PieChartCalories data={month} />
          : <Message severity="warn" text="You haven't Calories data in this month"/>
        }
      </section>

      <section className="progress__chart">
        {
          dataForChart
            ? <LinearChart data={dataForChart} />
            : <Message severity="warn" text="You haven't training in this month"/>
        }

      </section>
      <section className="progress__chart">
      {
        dataForChart2 &&
        <Chart
          color={['#82ca9d', '#8884d8', '#d88484']}
          data={dataForChart2}
          type="line"
          options={{
            layout: {
              padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 50
              }
            },
            scales: {
              xAxes: [{
                offset: true,
                type: 'time',
                time: {
                    displayFormats: {
                      quarter: 'MMM D'
                    }
                },
                gridLines: {
                  color: '#2b2b2b',
                  borderDash: [5, 5],
                  drawTicks: true,
                  zeroLineWidth: 1,
                  zeroLineColor: 'rgb(144, 144, 144)'
                }
                // labels: ['January', 'February', 'March', 'April', 'May', 'June']
              }],
              yAxes: [{
                gridLines: {
                  color: '#2b2b2b',
                  borderDash: [5, 5],
                  drawTicks: true,
                  zeroLineWidth: 1,
                  zeroLineColor: 'rgb(144, 144, 144)'
                }
              }]
            },
            ticks: {
              display: false
            },
            title: {
              display: true,
              text: 'My Title',
              fontSize: 16
            },
            legend: {
              position: 'bottom',
              labels: {
                padding: 15
              }
            },
            tooltips: {
              intersect: false,
              mode: 'index',
              titleFontSize: 16,
              bodyFontSize: 14,
              bodySpacing: 4,
              multiKeyBackground: 'none',
              xPadding: 12,
              yPadding: 12,
              callbacks: {
                title: (item, data) => {
                  const label = item[0].label.split(', ')
                  return `${label[0]} ${label[1]}`
                }
              }
            },
            elements: {
              point: {
                pointStyle: 'circle',
                radius: 5,
                hoverRadius: 6,
                borderColor: '#fff'
              },
              line: {
                borderWidth: 4,
                borderCapStyle: 'round',
              },
              rectangle: {
                backgroundColor: '#f00'
              }
            }
          }}
        />
      }
      </section>
    </div>
  )
}
