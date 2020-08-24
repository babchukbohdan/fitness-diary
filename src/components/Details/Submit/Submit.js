import React from 'react'
import { Spinner } from '../../UI/Spinner/Spinner'

export const Submit = ({value, postData, loading}) => {
  const today = new Date()
  const path = `${today.getFullYear()}/${today.getMonth() + 1}`

  const submitHandler = (data, path) => {
    data = {...data}
    delete data.id
    postData(data, path)
      .then(() => {

      })
      .catch((error) => {

      })
  }

  return (
    <div className="details__save">

      <button
        className="btn btn-big"
        onClick={() => {
          submitHandler(value, path)
        }}
      >
        Save {loading &&  <Spinner />}
      </button>

    </div>
  )
}
