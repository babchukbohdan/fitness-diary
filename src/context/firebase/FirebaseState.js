import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { NotificationContext } from '../Notification/notificationContext'
import { SHOW_LOADER_FETCHING, ADD_TRAINING, FETCH_MONTH, REMOVE_TRAINING, HIDE_LOADER_FETCHING, SHOW_LOADER_POSTING, HIDE_LOADER_POSTING } from '../types'


export const FirebaseState = ({children}) => {
  const initialState = {
    month: [],
    postingData: false,
    loading: false,
    error: false
  }


  const [state, dispatch] = useReducer(firebaseReducer, initialState)
  const {showNotification} = useContext(NotificationContext)
  const url = `${process.env.REACT_APP_FIREBASE_DATABASE}` // /${user?.uid}

  const showFetchingLoader = () => (dispatch({type: SHOW_LOADER_FETCHING}))
  const hideFetchingLoader = () => (dispatch({type: HIDE_LOADER_FETCHING}))
  const showPostingLoader = () => (dispatch({type: SHOW_LOADER_POSTING}))
  const hidePostingLoader = () => (dispatch({type: HIDE_LOADER_POSTING}))

  const resetState = () => {
    dispatch({
      type: FETCH_MONTH,
      payload: []
    })
    showNotification({
      closable: true,
      sticky: false,
      life: 3000,
      severity: 'info',
      summary: `App state reseted`,
      detail: ``
    })
  }


  const getTrainingsFromFirebase = (path) => {
    showNotification({
      closable: true,
      sticky: false,
      life: 10000,
      severity: 'info',
      summary: `Fetching from firebase`,
      detail: `Path ${path}`
    })

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
    if (same) {
      const pathWithId = `${path}/${same.id}`
      removeTraining(same.date, pathWithId)
    } else {

    }
  }

  const addTrainingDay = async (data, path) => {
    console.log(data, 'posting data')
    showPostingLoader()
    if (!state.month.length) {

      getTrainingsFromFirebase(path)
        .then(res => dispatchTrainings(res.data))
        .then((month) => {
          // removeSameExercise(month, path, data)
        })
    }


    removeSameExercise(state.month, path, data)

    try {
      const res = await axios.post(`${url}/${path}.json`, data)

      showNotification({
        closable: true,
        sticky: false,
        life: 9000,
        severity: 'success',
        summary: `Training saved`,
        detail: ``
      })

      const payload = {
        ...data,
        id: res.data.name
      }

      dispatch({
        type: ADD_TRAINING,
        payload
      })
    } catch (error) {
      showNotification({
        closable: true,
        sticky: true,
        severity: 'error',
        summary: `Server error`,
        detail: `Error server post method: ${error}`
      })

      throw new Error(error.message)
    }
    hidePostingLoader()
  }

  const removeTraining = async (date, path) => {
    try {
      await axios.delete(`${url}/${path}.json`)
    } catch (error) {
      showNotification({
        closable: true,
        sticky: false,
        life: 9000,
        severity: 'error',
        summary: `Can't remove training`,
        detail: `Problem ${error}.`
      })
    }

    dispatch({
      type: REMOVE_TRAINING,
      payload: date
    })
  }

  return (
    <FirebaseContext.Provider value={{
      showFetchingLoader, addTrainingDay, fetchMonth, resetState,
      loading: state.loading,
      postingData: state.postingData,
      month: state.month
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}
