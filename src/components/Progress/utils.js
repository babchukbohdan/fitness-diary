export const getCaloriesDataForPieChart = (data) => {
  const toPie = data.filter(day => {
    return day.diet !== undefined
  })

  // console.log('toPie' , toPie)

  if (toPie.length === 0) return null

  const totalMeal = toPie.reduce((acc, val) => {
    return 'meal' in val.diet
      ? acc + val.diet.meal.reduce((ac, va) => ac + va.calorie, 0)
      : acc
  }, 0)

  const totalNutrition = toPie.reduce((acc, val) => {
    return 'nutrition' in val.diet
      ? acc + val.diet.nutrition.reduce((ac, va) => ac + va.calorie, 0)
      : acc
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


export const getDataForChartBy = (month, exercises) => {
  console.log(month, 'month')
  // const newData = before.map(({info, training}) => training.exercises.map((set, idx, arr) => ({
  //   date: (new Date(info.date).setHours(0)) + (86400000 / arr.length * idx),
  //   bodyWeight: info.weight,
  //   reps: set.reps,
  //   exerciseWeight: set.weight
  // })) ).flat()

  // return newData

  const res = getDaysWithExercise(month, exercises)
    .map((trainings) => {
      return trainings.map(({ info, training, diet }) => {
        const { name, maxSet } = training.exercises
        const res = {
          date: +new Date(info.date),
          // dateString: info.date,

          [name.name]: maxSet.weight,
          // calories: getTotalCalories(diet)
        }
        if (name.withReps) {
          res[`${name.name} (reps)`] = maxSet.reps
        }
        if (name?.withBodyWeight) {
          res.bodyWeight = info.weight
        }
        return res
      })
    })
  // console.log(res, 'res')
  const res2 = res.flat().sort((a, b) => a.date - b.date)

  const res3 = res2.reduce((acc, cur, idx, arr) => {
    if (!acc.some((obj) => obj.date === cur.date)) {
      const sameDate = arr.filter(day => day.date === cur.date)
      const newTraining = sameDate.reduce((acc, cur) => {
        return { ...acc, ...cur }
      }, {})

      return [...acc, newTraining]
    } else {
      return acc
    }

  }, []).sort((a, b) => a.date - b.date)


  return res3
}

const getTotalCalories = (diet) => {
  if (diet) {
    const totalMeal = diet.meal.reduce((acc, meal) => acc + meal.calorie, 0)
    const totalNutrition = diet.nutrition.reduce((acc, nutrition) => acc + nutrition.calorie, 0)
    return totalMeal + totalNutrition
  } else return 0
}

export const geyDataForDietChart = (month) => {
  const res = month
    .map(({ info, diet }) => {
      return {
        date: +new Date(info.date),
        calories: getTotalCalories(diet),
        bodyWeight: info.weight,
      }
    })
    .sort((a, b) => a.date - b.date)

  console.log(res, 'data for diet chart')
  return res
}



const getDaysWithExercise = (month, exercises = []) => {
  // find training days only with exercises
  let trainings = month.filter(day => !!day?.training?.exercises)

  //
  const daysWithSelectedExercises = exercises.map(exercise => {
    const daysWithSpecialExercise = filterTrainingsByExercise(trainings, exercise)

    // change exercises key to max weight set
    return daysWithSpecialExercise.map(day => {
      return {
        ...day,
        training: {
          ...day.training,
          exercises: {
            name: exercise,
            // ...day.training.exercises,
            maxSet: day.training.exercises
              .filter(({ name }) => name.name === exercise.name)
              .reduce((acc, cur) => acc.concat(cur.sets), []) // if 2 same exercises in one day make one array
              .reduce((acc, cur) => acc.weight > cur.weight ? acc : cur) // show only 1 set with max exercise weight
          }
        }

      }
    })
  })

  console.log(daysWithSelectedExercises, 'daysWithSelectedExercises')
  return daysWithSelectedExercises
}

const filterTrainingsByExercise = (trainings, exercise) => {
  return trainings.filter(
    ({ training }) => training.exercises.some(ex => {
      return ex.name.name === exercise.name
    }))
}


export const addExerciseToDataChart = (month, exercise, ex) => {
  // create array of data for chart where keys will be lines or axis

  const ex2 = getDataForChartBy(month, exercise)
  const newEx = ex.map(val => {
    const as = ex2.filter(ex2 => ex2.date === val.date)[0]
    if (as) {
      return ({
        ...val,
        [exercise.name]: as[exercise.name],
        [exercise.name + ' (reps)']: as[exercise.name + ' (reps)']
      })
    } else {
      return {
        ...val,
        [exercise.name]: null,
        [exercise.name + ' (reps)']: null
      }
    }
  })

  ex2.forEach(val => {
    const as = ex.filter(newEx => newEx.date === val.date)[0]
    if (!as) {
      newEx.push({
        ...resetPropsValues(ex[0]),
        ...val
      })
    }
  })

  return newEx.sort((a, b) => a.date - b.date)
}

const resetPropsValues = (obj) => {
  let res = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = null
    }
  }
  return res
}
