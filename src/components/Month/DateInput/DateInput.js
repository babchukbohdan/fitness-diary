import React from 'react'
import { getDayString } from '../utils'
import {ReactComponent as DateIcon} from '../../../images/calendar.svg'

import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/nova-colored/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'

export const DateInput = ({setDate, date}) => {
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
  return (
    <div className="month__select">
      {/* <label htmlFor="date">
        <input
          id="date"
          type="month"
          name="date"
          min="2012-12"
          max="2100-12"
          value={getDayString(date)}
          onChange={(e) => {
            console.log(new Date(Date.parse(e.target.value)), 'input date')
            setDate(new Date(Date.parse(e.target.value)))
          }}
          onKeyDown={(e) => e.preventDefault()}
        />
        <DateIcon className="icon" />
      </label> */}

      <Calendar
        locale={ru}
        value={date}
        readOnlyInput={true}
        dateFormat="MM yy"
        monthNavigator={false}
        yearNavigator={false}
        showButtonBar={false}
        showTime={false}
        yearRange="2010:2030"
        view="month"
        showIcon={true}
        onSelect={(e) => {
          console.log(new Date(Date.parse(e.value)), 'input date')
          setDate(new Date(Date.parse(e.value)))
        }}
      />

    </div>
  )
}
