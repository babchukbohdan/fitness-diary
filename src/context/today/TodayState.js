import React, { useReducer } from 'react'
import { TodayContext } from './todayContext'
import { todayReducer } from './todayReducer'
import { getDayString, getTimeString } from '../../components/Month/utils'
import { ADD_EXERCISE, REMOVE_EXERCISE, ADD_SET, REPLACE_SET, CHANGE_VALUE } from '../types'

export const TodayState = ({children}) => {
  const initialState = {
    date: getDayString(new Date(), true),
    exercises: [],
    note: '',
    start: getTimeString(new Date()),
    end: getTimeString(new Date()),
    weight: 77,
    sleep: 8
  }

  const [state, dispatch] = useReducer(todayReducer, initialState)

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
    console.log('addSet');
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




  return (
    <TodayContext.Provider value={{
      state: state,
      addExercise, removeExercise,
      addSet, replaceSet,
      changeValue
    }}>
      {children}
    </TodayContext.Provider>
  )
}
