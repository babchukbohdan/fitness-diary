import { ADD_EXERCISE, REMOVE_EXERCISE, ADD_SET, REPLACE_SET, CHANGE_VALUE, INIT_STATE, ADD__MEEL,  REMOVE__MEEL, CHANGE__MEEL, ADD__PHARMA, REMOVE__PHARMA, CHANGE__PHARMA } from "../types"

const handlers = {
  [INIT_STATE]: (state, {payload}) => (payload),
  [ADD_EXERCISE]: (state, {payload}) => {
    const {training} = state
    return {
      ...state,
      training: {
        ...training,
        exercises: [...training.exercises, payload],
      }
    }
  },
  [REMOVE_EXERCISE]: (state, {payload}) => ({
    ...state,
    training: {
      ...state.training,
      exercises: state.training.exercises.filter(({id}) => id !== payload)
    }

  }),
  [ADD_SET]: (state, {payload}) => ({
    ...state,
    training: {
      ...state.training,
      exercises: _addSet(state.training.exercises, payload.id, payload.set)
    }
  }),
  [REPLACE_SET]: (state, {payload}) => ({
    ...state,
    training: {
      ...state.training,
      exercises: _replaceSet(
        state.training.exercises,
        payload.exerciseId,
        payload.setId,
        payload.newSet
      )
    }

  }),
  [CHANGE_VALUE]: (state, {payload}) => {
    const path = payload.path.split('.')
    const mainProp = path[0]
    const secProp = path[1]
    return {
      ...state,
      [mainProp]: {
        ...state[mainProp],
        [secProp]: payload.value
      }
    }
  },

  [ADD__PHARMA]: (state, {payload}) => {

    return {
      ...state,
      pharmacology: {...state.pharmacology, medications: [...state.pharmacology.medications, payload]}
    }
  },
  [REMOVE__PHARMA]: (state, { payload}) => ({
    ...state,
    pharmacology: {
      ...state.pharmacology,
      medications: [...state.pharmacology.medications.filter(({ id }) => id !== payload)]}
  }),

  [CHANGE__PHARMA]: (state, { payload }) => ({
    ...state,
    pharmacology: {
      ...state.pharmacology,
      medications: [...state.pharmacology.medications].map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload.newItem }
        }
        return item
      })}

  }),

  [ADD__MEEL]: (state, { payload, dietType }) => {
    return {
      ...state, diet: {...state.diet, [dietType]:[...state.diet[dietType], payload]}
    }
  },
  [REMOVE__MEEL]: (state, { payload, dietType }) => ({
    ...state, diet: {...state.diet, [dietType]:[...state.diet[dietType].filter(({ id }) => id !== payload)]}
  }),
  [CHANGE__MEEL]: (state, { payload, dietType }) => ({
    ...state,
    diet: {
      ...state.diet,
      [dietType]: [...state.diet[dietType]].map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload.newItem }
        }
        return item
      })}

  }),
  DEFAULT: state => state
}

export const todayReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  const newState = handle(state, action)
  console.log(newState, 'today newState')
  return newState
}

// Helpfull functions

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
