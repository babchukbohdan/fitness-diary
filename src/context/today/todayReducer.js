import { ADD_EXERCISE, REMOVE_EXERCISE, ADD_SET, REMOVE_SET } from "../types"

const handlers = {
  [ADD_EXERCISE]: (state, {payload}) => ({
    ...state,
    exercises: [...state.exercises, payload],
  }),
  [REMOVE_EXERCISE]: (state, {payload}) => ({
    ...state,
    exercises: state.exercises.filter(({id}) => id !== payload)
  }),
  [ADD_SET]: (state, {payload}) => ({
    ...state,
    exercises: _addSet(state.exercises, payload.id, payload.set)
  }),
  [REMOVE_SET]: (state, {payload}) => ({
    ...state,
    exercises: _removeSet(state.exercises, payload.id, payload.index)
  }),
  DEFAULT: state => state
}

export const todayReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  const newState = handle(state, action)
  console.log(newState, 'newState')
  return newState
}

const getSetsInExercisesById = (exercises, id) => {
  const exercise = exercises.find((item) => item.id === id)
  return [...exercise.sets]
}



const _addSet = (exercises, id, set) => {
  const exerciseIndex = exercises.findIndex((item) => item.id === id)
  const findExercise = exercises.find((item) => item.id === id)

  const sets = getSetsInExercisesById(exercises, id)
  sets.push({...set})
  const newExercise = {...findExercise, sets}

  const res = [
    ...exercises.slice(0, exerciseIndex),
    newExercise,
    ...exercises.slice(exerciseIndex + 1),
  ]
  console.log(findExercise,'findExercise');
  return res
}

const _removeSet = (exercises, id, index) => {
  console.log(index);
  const exerciseIndex = exercises.findIndex((item) => item.id === id)
  const findExercise = exercises.find((item) => item.id === id)

  const oldSets = getSetsInExercisesById(exercises, id)

  const sets = oldSets.filter((set, i) => i !== index )



  const newExercise = {...findExercise, sets}


  const res = [
    ...exercises.slice(0, exerciseIndex),
    newExercise,
    ...exercises.slice(exerciseIndex + 1),
  ]

  return res
}
