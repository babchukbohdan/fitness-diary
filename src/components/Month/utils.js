export const getDayName = (num) => {
  const arr = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД']

  return arr[num % 7]
}

function getSpanNumber(day) {
  if(day === 0) {
    return 6
  }
  return day - 1
}

export const getTimeString = (date) => {
  let hours = date.getHours()
  let min = date.getMinutes()
  if (hours < 10) hours = `0${hours}`
  if (min < 10) min = `0${min}`
  return `${hours}:${min}`
}

export const getDayString = (date, withDate = false) => {
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month < 10) month = `0${month}`
  if (day < 10) day = `0${day}`
  if (withDate) return `${date.getFullYear()}-${month}-${day}`
  return `${date.getFullYear()}-${month}`
}

export const getDaysData = (date, trainingsDays = []) => {
  const month = date.getMonth() // месяц
  const year = date.getFullYear() // год


  const firstDay = new Date(year, month).getDay() // день с которого начинается месяц
  const daysCount = new Date(year, month + 1, 0).getDate() // количество дней в месяце


  // создает пустой массив для в количестве firstDay
  const voidDays = new Array(getSpanNumber(firstDay))
    .fill('')
    .map((day, index) => ({id: 0 - index}))

  // создает массив данных для рендеринга по количеству дней в месяце (daysCount)
  let days = new Array(daysCount)
    .fill('')
    .map((day, index) => ({
      id: index + 1,
      date: getDayString(new Date(year, month, index + 1), true),

    }))

  trainingsDays.forEach(day => {
    day.url = `${year}/${month + 1}`;
    days[new Date(day.date).getDate() - 1] = day
  });

  return voidDays.concat(days)
}
