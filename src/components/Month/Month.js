import React, { useState } from 'react'
import './Month.scss'
import { getDaysData, getDayString } from './utils'


export const Month = () => {

  const [date, setDate] = useState(new Date())

  const daysData = getDaysData(date) // fetching data
  const todayString = getDayString(new Date(), true) // current date


  console.log('string value', getDayString(date));
  console.log('daysData', daysData);

  return (
    <div className='month'>
      <div className="month__select">
        <input
          id="date"
          type="month"
          name="date"
          value={getDayString(date)}
          onChange={(e) => {
            console.log(e.target.value, "value")
            console.log(new Date(Date.parse(e.target.value)).toDateString(), 'date object')
            console.log(new Date(Date.parse(e.target.value)).getMonth(), 'date month')
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

            if (day.date === todayString) {
              clazz.push('today')
            }

            return (
              <div
                className={clazz.join(' ')}
                key={day.id}
              >
                <span className="month__date">{day.day}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
