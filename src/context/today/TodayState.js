import React, { useReducer } from 'react'
import { TodayContext } from './todayContext'
import { todayReducer } from './todayReducer'
import { getDayString } from '../../components/Month/utils'
import { ADD_EXERCISE, REMOVE_EXERCISE, ADD_SET, REMOVE_SET } from '../types'

export const TodayState = ({children}) => {
  const initialState = {
    date: getDayString(new Date(), true),
    exercises: [],
    note: '',
    start: '',
    end: '',
    weight: '70kg',
    sleep: ''
  }

  const [state, dispatch] = useReducer(todayReducer, initialState)

  const addExercise = () => {
    dispatch({
      type: ADD_EXERCISE,
      payload: {
        id: Date.now(),
        name: '',
        sets: [],
      }
    })
  }

  const removeExercise = (id) => {
    console.log(id);
    dispatch({
      type: REMOVE_EXERCISE,
      payload: id
    })
  }

  const addSet = (id, set) => {
    console.log('addSet');
    dispatch({
      type: ADD_SET,
      payload: {
        id,
        set
      }
    })
  }

  const removeSet = (id, index) => {
    console.log('removeSet in id = ', id)
    console.log('removeSet index = ', index)
    dispatch({
      type: REMOVE_SET,
      payload: {
        id, index
      }
    })
  }





  return (
    <TodayContext.Provider value={{
      state: state,
      addExercise, removeExercise,
      addSet, removeSet
    }}>
      {children}
    </TodayContext.Provider>
  )
}
