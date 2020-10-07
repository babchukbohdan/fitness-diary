export const getCaloriesDataForPieChart = (data) => {
  const toPie = data.filter(day => {
    return day.diet !== undefined
  })

  // console.log('toPie' , toPie)

  if (toPie.length === 0) return null

  const totalMeal = toPie.reduce((acc, val) => {
    return 'meal' in val.diet
      ? acc + val.diet.meal.reduce((ac, va) => ac + va.calorie , 0)
      : acc
  }, 0)

  const totalNutrition = toPie.reduce((acc, val) => {
    if (!val.diet.nutrition) {
      return acc + 0
    }
    return acc + val.diet.nutrition.reduce((ac, va) => ac + va.calorie , 0)
  }, 0)

  return [
    {
      "name": "Meal",
      "value": totalMeal
    },
    {
      "name": "Nutrition",
      "value": totalNutrition
    }
  ]
}


export const getDataForChartBy = (month, exercise) => {

    // const newData = before.map(({info, training}) => training.exercises.map((set, idx, arr) => ({
    //   date: (new Date(info.date).setHours(0)) + (86400000 / arr.length * idx),
    //   bodyWeight: info.weight,
    //   reps: set.reps,
    //   exerciseWeight: set.weight
    // })) ).flat()

    // return newData

    return getDaysWithExercise(month, exercise).map(({info, training}) => ({
      date: new Date(info.date).getTime(),
      // dateString: info.date,
      bodyWeight: info.weight,
      [`${exercise.name} reps`]: training.exercises.reps,
      [exercise.name]: training.exercises.weight
    })).sort((a, b) => a.date - b.date)
}


const getDaysWithExercise = (month, exercise) => {
  let daysWithExercises = month.filter(day => !!day?.training?.exercises)

  const daysWithSpecialExercises = daysWithExercises.filter(({training}) => training.exercises.some(ex => {
      return ex.name.name === exercise.name
    }))
  // console.log(daysWithSpecialExercises, 'daysWithSpecialExercises')


  const res = daysWithSpecialExercises.map(day => {
    return {
      ...day,
      training: {
        ...day.training,
        exercises: day.training.exercises
        .filter(({name}) => name.name === exercise.name)
        .reduce((acc, cur) => acc.concat(cur.sets), [])
        .reduce((acc, cur) => acc.weight > cur.weight ? acc : cur)
      }

    }
  })

  console.log(res, exercise)

  return res
}
