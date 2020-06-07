import React, { useReducer } from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { SHOW_LOADER, ADD_TRAINING, FETCH_MONTH, REMOVE_TRAINING } from '../types'

const url = 'https://fitness-diary-f96e8.firebaseio.com'

export const FirebaseState = ({children}) => {
  const initialState = {
    loading: false,
    month: []
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const fetchMonth = async (path) => {
    console.log('fetching data in --', path);
    const res = await axios.get(`${url}/${path}.json`)
    console.log(res.data, 'from firebase')
    console.log(path, 'path')

    if (res.data === null) {
      console.log('data === null');
      return dispatch({
        type: FETCH_MONTH,
        payload: []
      })
    }

    const payload = Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    })

    dispatch({
      type: FETCH_MONTH,
      payload
    })

  }

  const addTrainingDay = async (data, path) => {

    const same = state.month.find(day => day.date === data.date)
    console.log(same);
    if (same) {
      const pathWithId = `${path}/${same.id}`
      removeTraining(same.date, pathWithId)
    }


    try {
      const res = await axios.post(`${url}/${path}.json`, data)

      const payload = {
        ...data,
        id: res.data.name
      }

      dispatch({
        type: ADD_TRAINING,
        payload
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  const removeTraining = async (date, path) => {
    await axios.delete(`${url}/${path}.json`)
    dispatch({
      type: REMOVE_TRAINING,
      payload: date
    })
  }

  return (
    <FirebaseContext.Provider value={{
      showLoader, addTrainingDay, fetchMonth,
      loading: state.loading,
      month: state.month
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}
