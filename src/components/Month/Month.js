import React, { useState, useContext, useEffect } from 'react'
import './Month.scss'
import { getDaysData, getDayString } from './utils'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { Link } from 'react-router-dom'
import { Loader } from '../Loader/Loader'


export const Month = () => {


  const [date, setDate] = useState(new Date())
  const {loading, fetchMonth, month} = useContext(FirebaseContext)

  useEffect(() => {
    fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
    // eslint-disable-next-line
  }, [date])

  //<-- month #todo  // fetching data

  const daysData = getDaysData(date, month)

  const today = getDayString(new Date(), true) // current date
  const url = 'https://fitness-diary-f96e8.firebaseio.com'

  if (loading) {
    return <Loader/>
  }

  return (
    <div className='month'>
      <div className="month__select">
        <input
          id="date"
          type="month"
          name="date"
          min="2012-12"
          max="2100-12"
          value={getDayString(date)}
          onChange={(e) => {
            setDate(new Date(Date.parse(e.target.value)))
          }}
        />
      </div>
      <div className="month__daynames">
        <div>ПН</div>
        <div>ВТ</div>
        <div>СР</div>
        <div>ЧТ</div>
        <div>ПТ</div>
        <div>СБ</div>
        <div>НД</div>
      </div>
      <div className="month__days">
        {
          daysData.map((day, i) => {


            const clazz = ["month__item"]
            if (day.date === today) {
              clazz.push('today')
            }
            const isTraining = !!day.exercises
            const date = new Date(day.date).getDate() || ''
            let ifTraining
            if (isTraining) {
              const muscleGroups = day.exercises.map(exercise => {
                return exercise.name.muscleGroup
              })
              const uniqueMuscleGroups = [...new Set(muscleGroups)]
              uniqueMuscleGroups.length = 4

              ifTraining = (
                <>
                  <Link
                      url={`${url}/${day.url}/${day.id}`}
                      to={`info/${day.url}/${day.id}`}
                      className="month__date"
                      // onClick={clickHandler}
                  >{date}</Link>
                  <div className="month__muscles">
                    {
                      uniqueMuscleGroups.map((muscle, i) => (
                        <img
                          src={`./img/icons/muscleGroups/${muscle}.png`}
                          alt={muscle}
                          className="icon muscle__icon"
                          key={i}
                        />
                      ))
                    }
                  </div>
                </>
              )
            }




            return (
              <div
                className={clazz.join(' ')}
                key={day.id}
              >
                {
                  isTraining
                  ? ifTraining
                  : <span className="month__date">{date}</span>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
