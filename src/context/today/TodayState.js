import React, { useReducer } from 'react'
import { TodayContext } from './todayContext'
import { todayReducer } from './todayReducer'
import { getDayString, getTimeString } from '../../components/Month/utils'
import { ADD_EXERCISE, REMOVE_EXERCISE, ADD_SET, REPLACE_SET, CHANGE_VALUE, INIT_STATE, ADD__MEEL,
  REMOVE__MEEL, CHANGE__MEEL, ADD__PHARMA, REMOVE__PHARMA, CHANGE__PHARMA } from '../types'
import { checkPropertysEqualToInterface } from '../../components/utils'

export const TodayState = ({children}) => {
  const initialState2 = {
    date: getDayString(new Date(), true),
    exercises: [],
    diet: {
      meal: [],
      nutrition: [],
      note: ''
    },
    note: '',
    start: getTimeString(new Date()),
    end: getTimeString(new Date()),
    weight: 77,
    sleep: 8
  }
  const initialState = {
    info: {
      date: getDayString(new Date(), true),
      weight: 77,
      sleep: 8,
    },
    training: {
      exercises: [],
      note: '',
      start: getTimeString(new Date()),
      end: getTimeString(new Date()),
    },
    diet: {
      meal: [],
      nutrition: [],
      note: ''
    },
    pharmacology: {
      medications: [],
      note: ''
    },
  }

  const [state, dispatch] = useReducer(todayReducer, initialState)

  const pushState = (data) => {
    data = checkPropertysEqualToInterface(data, initialState)
    dispatch({
      type: INIT_STATE,
      payload: {...data}
    })
  }

  const addExercise = (name) => {
    dispatch({
      type: ADD_EXERCISE,
      payload: {
        id: Date.now(),
        name,
        sets: [{
          weight: random(50, 100),
          reps: random(5, 20),
          id: Date.now(),
        }],
      }
    })
  }

  const removeExercise = (id) => {
    dispatch({
      type: REMOVE_EXERCISE,
      payload: id
    })
  }


  const random = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }


  const addSet = (id) => {
    dispatch({
      type: ADD_SET,
      payload: {
        id,
        set: {
          weight: random(50, 100),
          reps: random(5, 20),
          id: Date.now()
        }
      }
    })
  }

  const replaceSet = (exerciseId, setId, newSet) => {
    dispatch({
      type: REPLACE_SET,
      payload: {
        exerciseId, setId, newSet
      }
    })
  }

  const changeValue = (path, value) => {
    dispatch({
      type: CHANGE_VALUE,
      payload: {path, value}
    })
  }

  const addMeel = (type) => {
    dispatch({
      type: ADD__MEEL,
      dietType: type,
      payload: {
        name: `${type}# ${random(99, 500)}`,
        calorie: random(99, 500),
        id: Date.now()
      }
    })
  }

  const removeMeel = (id, type) => {
    dispatch({
      type: REMOVE__MEEL,
      dietType: type,
      payload: id
    })
  }

  const changeMeel = (id, newItem, type) => {
    dispatch({
      type: CHANGE__MEEL,
      dietType: type,
      payload: {
        id, newItem
      }
    })
  }

  const addPharma = () => {
    dispatch({
      type: ADD__PHARMA,
      payload: {
        name: `Anabolik ${random(99, 500)}`,
        dose: `${random(99, 500)} ME`,
        id: Date.now()
      }
    })
  }

  const removePharma = (id) => {
    dispatch({
      type: REMOVE__PHARMA,
      payload: id
    })
  }

  const changePharma = (id, newItem) => {
    dispatch({
      type: CHANGE__PHARMA,
      payload: {
        id, newItem
      }
    })
  }

  return (
    <TodayContext.Provider value={{
      state: state, pushState,
      addExercise, removeExercise,
      addSet, replaceSet,
      changeValue,
      addMeel, removeMeel, changeMeel,
      addPharma, removePharma, changePharma
    }}>
      {children}
    </TodayContext.Provider>
  )
}
