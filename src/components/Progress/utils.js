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
