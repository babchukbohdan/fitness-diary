import { getDayString, getTimeString } from "../Month/utils"
import { random } from "../utils"

const exercises = {
  "legs": ["Приседания с штангой на спине"],
  "back": ["Тяга штанги в наклоне", "Гиперэкстензия"],
  "chest": ["Жим штанги лёжа"],
  "shoulders": ["Жим штанги сидя"],
  "trapezius": ["Шраги"],
  "triceps": ["Французский жим"],
  "biceps": ["Подьем штанги на бицепс"],
  "abs": ["Скручивания в тренажере"],
}

const exArr = Object.keys(exercises).map(key => {
  return {
    name: exercises[key][0],
    muscleGroup: key
  }
})

export const mockTraining = (month, day) => {
  const start = new Date()
  const end = start + random(60, 90) * 60 * 1000

  const state = {
    info: {
      date: getDayString(new Date(2020, month - 1, day), true),
      weight: random(69, 80),
      sleep: random(6, 9),
    },
    training: {
      exercises: [],
      note: '',
      start: getTimeString(new Date()),
      end: getTimeString(new Date()),
    },
    diet: {
      meal: getMeals(),
      nutrition: getMeals(),
      note: `Today I eat ${random(1893, 2585)} calories`
    },
    pharmacology: {
      medications: getPharmas(),
      note: `Today I inject ${random(100, 200)} ME pharmacology`
    },
  }

  const getSets = () => {

    const getSet = () => ({
      weight: random(50, 100),
      reps: random(5, 20),
      id: Date.now() + random(1, 99999),
    })

    return new Array(random(3, 5)).fill('').map(item => {
      return getSet()
    })
  }

  function getMeals() {

    const getMeal = (index) => ({
      calorie: random(245, 900),
      id: Date.now() + random(1, 99999),
      name: 'Meal #' + index
    })

    return new Array(random(3, 5)).fill('').map((item, index) => {
      return getMeal(index + 1)
    })
  }

  function getPharmas() {

    const getPharma = (index) => ({
      id: Date.now() + random(1, 99999),
      name: 'Anabolik #' + index,
      dose: `${random(10, 100)} ME`
    })

    return new Array(random(3, 5)).fill('').map((item, index) => {
      return getPharma(index + 1)
    })
  }


  const ex = new Array(random(5, 7))
    .fill('')
    .map(item => ({
      id: Date.now() + random(1, 99999),
      name: exArr[random(0, 7)],
      sets: getSets(),
    }))

  const note = ex.map(item => {
    return item.name.name
  }).join(', ')

  state.training.exercises = ex;
  state.training.note = `Лучшая тренировка в мире. Сделал: ${note}`
  return state
}
