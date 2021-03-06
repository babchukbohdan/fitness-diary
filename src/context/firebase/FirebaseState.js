import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { NotificationContext } from '../Notification/notificationContext'
import { SHOW_LOADER_FETCHING, ADD_TRAINING, FETCH_MONTH, REMOVE_TRAINING, HIDE_LOADER_FETCHING, SHOW_LOADER_POSTING, HIDE_LOADER_POSTING } from '../types'
import { mockTraining } from '../../components/MockData/MockData'

// delete start
// axios.get(`https://fitness-diary-f96e8.firebaseio.com/2020.json`)
//   .then((res) => {
//     const newRes = res.data.filter(item => item !== null)

//     newRes.map((month, index) => {
//       const mapping = Object.keys(month)

//       mapping.map((id, idx) => {
//         const changeDb = async () => {
//           return await axios.put(`https://fitness-diary-f96e8.firebaseio.com/2020/${index}/${id}.json`, mockTraining(index, idx + 1))
//         }
//         changeDb()
//         return true
//       })
//     })
//   })
  //delete end
  // axios.post(
  //   "https://fitness-diary-f96e8.firebaseio.com/2020/10.json",
  //   mockTraining(10, 1)
  // )


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

  const removeSameExercise = async (month, path, data) => {
    console.log('remove same ex')
    const same = month.find(day => day.info.date === data.info.date)
    if (same) {
      console.log('fined same ex', same)
      const pathWithId = `${path}/${same.id}`
      await removeTraining(same.info.date, pathWithId)
    } else {
      console.log('else in remove Same')
    }
  }

  const addTrainingDay = async (data, path) => {
    showPostingLoader()
    if (!state.month.length) {

      getTrainingsFromFirebase(path)
        .then(res => dispatchTrainings(res.data))
        .then((month) => {
          // removeSameExercise(month, path, data)
        })
    }


    await removeSameExercise(state.month, path, data)

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

      // throw new Error(error.message)   WTF???
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
    } finally {
      dispatch({
        type: REMOVE_TRAINING,
        payload: date
      })
    }
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
