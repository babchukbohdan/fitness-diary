import { getTimeString } from "../Month/utils"

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

const random = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export const mockTraining = () => {
  const start = new Date().getTime()
  const end = start + random(60, 90) * 60 * 1000

  const state = {
    exercises: [],
    note: '',
    start: getTimeString(new Date(start)),
    end: getTimeString(new Date(end)),
    weight: random(72, 77),
    sleep: random(6, 8)
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

  state.exercises = ex;
  state.note = `Лучшая тренировка в мире. Сделал: ${note}`
  return state
}
