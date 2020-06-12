import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { Loader } from '../UI/Loader/Loader'
import { DayNames } from './DayNames/DayNames'
import { Days } from './Days/Days'
import { DateInput } from './DateInput/DateInput'
import './Month.scss'

export const Month = () => {
  const [date, setDate] = useState(new Date())
  const {loading, fetchMonth, month} = useContext(FirebaseContext)

  useEffect(() => {
    fetchMonth(`${date.getFullYear()}/${date.getMonth() + 1}`)
    // eslint-disable-next-line
  }, [date])




  if (loading) {
    return <Loader/>
  }

  return (
    <div className='month'>
      <DateInput setDate={setDate} date={date} />

      <DayNames />

      <Days date={date} month={month} />
    </div>
  )
}
