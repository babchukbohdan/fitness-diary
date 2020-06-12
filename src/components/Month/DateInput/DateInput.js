import React from 'react'
import { getDayString } from '../utils'

export const DateInput = ({setDate, date}) => {
  return (
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
  )
}
