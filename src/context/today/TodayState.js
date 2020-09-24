import React, { useReducer } from 'react'
import { TodayContext } from './todayContext'
import { todayReducer } from './todayReducer'
import { getDayString, getTimeString } from '../../components/Month/utils'
import { ADD_EXERCISE, REMOVE_EXERCISE, ADD_SET, REPLACE_SET, CHANGE_VALUE, INIT_STATE, ADD__MEEL,
  REMOVE__MEEL, CHANGE__MEEL } from '../types'
import { checkPropertysEqualToInterface } from '../../components/utils'

export const TodayState = ({children}) => {
  const initialState = {
    date: getDayString(new Date(), true),
    exercises: [],
    diet: {
      meal: [],
      nutrition: [],
    },
    note: '',
    start: getTimeString(new Date()),
    end: getTimeString(new Date()),
    weight: 77,
    sleep: 8
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

  const changeValue = (key, value) => {
    dispatch({
      type: CHANGE_VALUE,
      payload: {key, value}
    })
  }

  const addMeel = (type) => {
    dispatch({
      type: ADD__MEEL,
      dietType: type,
      payload: {
        name: `Meel(${type})# ${random(99, 500)}`,
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


  return (
    <TodayContext.Provider value={{
      state: state, pushState,
      addExercise, removeExercise,
      addSet, replaceSet,
      changeValue,
      addMeel, removeMeel, changeMeel
    }}>
      {children}
    </TodayContext.Provider>
  )
}
