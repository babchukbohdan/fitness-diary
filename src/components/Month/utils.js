import { dayNames } from "../../constants"

export const getmuscleGroups = (exercises) => {
  const muscleGroups = exercises.map(exercise => {
    return exercise.name.muscleGroup
  })
  const uniqueMuscleGroups = [...new Set(muscleGroups)]
  uniqueMuscleGroups.length = 4
  return uniqueMuscleGroups
}

export const getDayName = (num) => {
  return dayNames[num % 7]
}

function getVoidDaysNumber(day) {
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


  // создает пустой массив в количестве firstDay
  const voidDays = new Array(getVoidDaysNumber(firstDay))
    .fill('')
    .map((_, index, arr) => ({id: index + 1 - arr.length}))

  // создает массив данных для рендеринга по количеству дней в месяце (daysCount)
  let days = new Array(daysCount)
    .fill('')
    .map((_, index) => ({
      id: index + 1,
      info: {
        date: getDayString(new Date(year, month, index + 1), true),
      }
    }))

  trainingsDays.forEach(day => {

    const newDay = {...day}
    newDay.url = `${year}/${month + 1}`;
    days[new Date(day.info.date).getDate() - 1] = newDay
  });

  return voidDays.concat(days)
}
