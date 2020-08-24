import { ADD_EXERCISE, REMOVE_EXERCISE, ADD_SET, REPLACE_SET, CHANGE_VALUE, INIT_STATE } from "../types"

const handlers = {
  [INIT_STATE]: (state, {payload}) => (payload),
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
  [REPLACE_SET]: (state, {payload}) => ({
    ...state,
    exercises: _replaceSet(
      state.exercises,
      payload.exerciseId,
      payload.setId,
      payload.newSet
    )
  }),
  [CHANGE_VALUE]: (state, {payload}) => ({
    ...state, [payload.key]: payload.value
  }),
  DEFAULT: state => state
}

export const todayReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  const newState = handle(state, action)
  // console.log(newState, 'today newState')
  return newState
}

const changeExercise = (exercises, exerciseId, newExercise) => {
  const exerciseIndex = exercises.findIndex((item) => item.id === exerciseId)
  return [
    ...exercises.slice(0, exerciseIndex),
    newExercise,
    ...exercises.slice(exerciseIndex + 1),
  ]
}

const replaceObjectInArrayById = (array, id, newItem) => {
  return array.map((item) => {
    if (item.id === id ) {
      return {...item,...newItem}
    }
    return item
  })
}

const removeObjectInArrayById = (array, id) => {
  return array.filter((item) => item.id !== id)
}


const _addSet = (exercises, exerciseId, set) => {
  const findExercise = exercises.find((item) => item.id === exerciseId)

  const sets = [...findExercise.sets, {...set}]
  const newExercise = {...findExercise, sets}


  return changeExercise(exercises, exerciseId, newExercise)
}


const _replaceSet = (exercises, exerciseId, setId, newSet = null) => {
  const findExercise = exercises.find((item) => item.id === exerciseId)

  const oldSets = [...findExercise.sets]
  let sets

  if (newSet) {
    sets = replaceObjectInArrayById(oldSets, setId, newSet)
  } else {
    sets = removeObjectInArrayById(oldSets, setId)
  }


  const newExercise = {...findExercise, sets}

  return changeExercise(exercises, exerciseId, newExercise)
}
