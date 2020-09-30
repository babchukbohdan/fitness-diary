import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { Loader } from '../UI/Loader/Loader'
import { DayNames } from './DayNames/DayNames'
import { Days } from './Days/Days'
import { DateInput } from './DateInput/DateInput'
import { getDayString } from './utils'

import './Month.scss'

export const Month = () => {
  const [date, setDate] = useState(new Date())
  const {loading, fetchMonth, month} = useContext(FirebaseContext)

  useEffect(() => {
    if (month.length && month[0].info.date.substr(0, 7) === getDayString(date)) {
      return
    } else {
      fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
    }

    // eslint-disable-next-line
  }, [date])




  if (loading) {
    return <Loader/>
  }

  return (
    <div className='month wrap'>
      <DateInput setDate={setDate} date={date} />

      <DayNames />

      <Days date={date} month={month} />
    </div>
  )
}
