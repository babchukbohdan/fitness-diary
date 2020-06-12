import React from 'react'
import { dayNames } from '../../../constants'

export const DayNames = () => {
  return (
    <div className="month__daynames">
      {
        dayNames.map(dayName => (<div key={dayName}>{dayName}</div>))
      }
    </div>
  )
}
