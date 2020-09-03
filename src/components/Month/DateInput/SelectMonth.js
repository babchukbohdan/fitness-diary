import React from 'react'
import {ReactComponent as CalendarIcon} from '../../../images/calendar.svg'
import {ReactComponent as ArrowIcon} from '../../../images/arrow.svg'
import './SelectMonth.scss'
import { useState } from 'react'

export const SelectMonth = () => {
  const ru = {
    firstDayOfWeek: 1,
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Сре', 'Чтв', 'Птн', 'Суб'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    today: 'Сегодня',
    clear: 'Очистить',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'ПН'
  }

  const [isMonthVisible, setIsMonthVisible] = useState(false)
  const [date, setDate] = useState(new Date())
  const [year, setYear] = useState(new Date().getFullYear())

  const arrowHandler = (e) => {
    setIsMonthVisible(true)
    setYear(year + 1)
  }


  return (
    <span className="calendar">
      <input
      value={date}
      onBlur={() => setIsMonthVisible(false)}
      onFocus={() => setIsMonthVisible(true)}
      type="text" name="" id="" className="calendar__input" />
      <button
      onBlur={() => setIsMonthVisible(false)}
      onFocus={() => setIsMonthVisible(true)}
      className="calendar__btn calendar__btn--month"><CalendarIcon className="calendar__icon" /></button>
      <div className={`calendar__month-picker ${isMonthVisible ? 'calendar__month-picker--visible' : ''}`} >
        <div className="calendar__header">
          <button
          onClick={arrowHandler}
          className="calendar__btn calendar__btn--prev"><ArrowIcon className="calendar__icon calendar__icon--arrow" /></button>
          <button
          onClick={arrowHandler}
          className="calendar__btn calendar__btn--next"><ArrowIcon className="calendar__icon calendar__icon--arrow" /></button>
          <div className="calendar__year">{year}</div>
        </div>
        <div className="calendar__body">
          {
            ru.monthNamesShort.map(monthName => {
              return <span className="calendar__month">{monthName}</span>
            })
          }
        </div>
      </div>
    </span>
  )
}
