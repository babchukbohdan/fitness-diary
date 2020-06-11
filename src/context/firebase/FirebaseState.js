import React, { useReducer } from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { SHOW_LOADER, ADD_TRAINING, FETCH_MONTH, REMOVE_TRAINING, HIDE_LOADER } from '../types'

const url = 'https://fitness-diary-f96e8.firebaseio.com'

export const FirebaseState = ({children}) => {
  const initialState = {
    loading: true,
    month: []
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const showLoader = () => (dispatch({type: SHOW_LOADER}))
  const hideLoader = () => (dispatch({type: HIDE_LOADER}))

  const getTrainingsFromFirebase = (path) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(axios.get(`${url}/${path}.json`))

      }, 300)
    })
  }

  const dispatchTrainings = (data) => {
    console.log('dispatching data');
    return new Promise((resolve) => {
      if (data === null) {
        console.log('data === null');
        return dispatch({
          type: FETCH_MONTH,
          payload: []
        })
      }

      const payload = Object.keys(data).map(key => {
        return {
          ...data[key],
          id: key
        }
      })

      dispatch({
        type: FETCH_MONTH,
        payload
      })
      resolve(payload)
    })
  }


  const fetchMonth = async (path) => {
    console.log('fetching month');
    showLoader()
    const res = await getTrainingsFromFirebase(path)
    dispatchTrainings(res.data)
    hideLoader()
  }

  const removeSameExercise = (month, path, data) => {
    const same = month.find(day => day.date === data.date)
    if (same) {
      const pathWithId = `${path}/${same.id}`
      removeTraining(same.date, pathWithId)
    }
  }

  const addTrainingDay = async (data, path) => {
    if (!state.month.length) {

      getTrainingsFromFirebase(path)
        .then(res => dispatchTrainings(res.data))
        .then((month) => {
          removeSameExercise(month, path, data)
        })
    }


    removeSameExercise(state.month, path, data)

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
    console.log('removingTraining ', path);
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
