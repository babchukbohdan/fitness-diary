import React, { useReducer } from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { SHOW_LOADER_FETCHING, ADD_TRAINING, FETCH_MONTH, REMOVE_TRAINING, HIDE_LOADER_FETCHING, SHOW_LOADER_POSTING, HIDE_LOADER_POSTING } from '../types'

const url = 'https://fitness-diary-f96e8.firebaseio.com'

export const FirebaseState = ({children}) => {
  const initialState = {
    month: [],
    postingData: false,
    loading: false,
    error: false
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const showFetchingLoader = () => (dispatch({type: SHOW_LOADER_FETCHING}))
  const hideFetchingLoader = () => (dispatch({type: HIDE_LOADER_FETCHING}))
  const showPostingLoader = () => (dispatch({type: SHOW_LOADER_POSTING}))
  const hidePostingLoader = () => (dispatch({type: HIDE_LOADER_POSTING}))

  const getTrainingsFromFirebase = (path) => {
    console.log('fetching from firebase');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(axios.get(`${url}/${path}.json`))

      }, 300)
    })
  }

  const dispatchTrainings = (data) => {
    return new Promise((resolve) => {
      if (data === null) {
        resolve([])
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
    showFetchingLoader()
    const res = await getTrainingsFromFirebase(path)
    dispatchTrainings(res.data)
    hideFetchingLoader()

    if (!res.data) {
      return []
    }

    return Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    })
  }

  const removeSameExercise = (month, path, data) => {
    const same = month.find(day => day.date === data.date)
    console.log('finding same');
    if (same) {
      console.log('same fined');
      const pathWithId = `${path}/${same.id}`
      removeTraining(same.date, pathWithId)
    } else console.log('same not fined');

  }

  const addTrainingDay = async (data, path) => {
    showPostingLoader()
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
    hidePostingLoader()
  }

  const removeTraining = async (date, path) => {
    console.log('removing');
    await axios.delete(`${url}/${path}.json`)
    dispatch({
      type: REMOVE_TRAINING,
      payload: date
    })
  }

  return (
    <FirebaseContext.Provider value={{
      showLoader: showFetchingLoader, addTrainingDay, fetchMonth,
      loading: state.loading,
      postingData: state.postingData,
      month: state.month
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}
