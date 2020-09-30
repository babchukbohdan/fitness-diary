import React from 'react'
import { getDaysData, getDayString } from '../utils'
import { TrainingDay } from '../TrainingDay/TrainingDay'

export const Days = ({date, month}) => {
  const daysData = getDaysData(date, month)
  const today = getDayString(new Date(), true)
  const baseCSSClass = ["month__item"] // classnames for callendar day
  return (
    <div className="month__days">
        {
          daysData.map((day) => {
            const { id, training, info = {} } = day
            const {date = ''} = info

            const clazz = [...baseCSSClass]
            if (date === today) {
              clazz.push('today')
            }

            const isTraining = !!training

            const dateNum = new Date(date).getDate() || ''

            return (
              <div
                className={clazz.join(' ')}
                key={id}
              >
                {
                  isTraining
                  ? <TrainingDay day={day} />
                  : <span className="month__date">{dateNum}</span>
                }
              </div>
            )
          })
        }
      </div>
  )
}
