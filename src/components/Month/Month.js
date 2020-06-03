import React, { useState, useContext, useEffect } from 'react'
import './Month.scss'
import { getDaysData, getDayString } from './utils'
import { FirebaseContext } from '../../context/firebase/firebaseContext'


export const Month = () => {

  const [date, setDate] = useState(new Date())
  const {loading, fetchMonth, month} = useContext(FirebaseContext)

  useEffect(() => {
    fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
    // eslint-disable-next-line
  }, [date])



  const daysData = getDaysData(date, month) // fetching data
  const today = getDayString(new Date(), true) // current date


  const url = 'https://fitness-diary-f96e8.firebaseio.com'

  const clickHandler = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute('href')
    console.log(href);
  }

  return (
    <div className='month'>
      <div className="month__select">
        <input
          id="date"
          type="month"
          name="date"
          value={getDayString(date)}
          onChange={(e) => {
            console.log(e.target.value)
            setDate(new Date(Date.parse(e.target.value)))
            // fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
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
            const date = new Date(day.date).getDate()

            return (
              <div
                className={clazz.join(' ')}
                key={day.id}
              >
                {
                  isTraining
                  ? <a
                      href={`${url}/${day.url}/${day.id}`}
                      className="month__date"
                      onClick={clickHandler}
                    >{date}</a>
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
