import React from 'react'
import { Spinner } from '../../UI/Spinner/Spinner'
import { useFirebaseContext } from '../../../context/firebase/firebaseContext'

export const Submit = ({value, postData, loading, btnText}) => {

  const today = new Date()
  const path = `${today.getFullYear()}/${today.getMonth() + 1}`

  const submitHandler = (data, path) => {
    data = {...data}
    delete data.id
    console.log('posting data', data)
    postData(data, path)
      .then(() => {

      })
      .catch((error) => {

      })
  }

  return (
    <div className="details__save">

      <button
        disabled={loading}
        className="btn btn-big btn--border"
        onClick={() => {
          submitHandler(value, path)
        }}
      >
        {btnText} {loading &&  <Spinner />}
      </button>

    </div>
  )
}
