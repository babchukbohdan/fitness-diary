import React from 'react'
import { Loader } from '../../UI/Loader/Loader'

export const Submit = ({value, postData, loading}) => {

  const today = new Date()
  const path = `${today.getFullYear()}/${today.getMonth() + 1}`

  const submitHandler = (data, path) => {
    postData(data, path)
      .then(() => {
        console.log('add training day');
      })
      .catch((e) => {
        console.log('Error server post methos');
      })
  }

  return (
    <div className="details__save">
      {
        loading
          ? <Loader />
          : <button className="btn btn-big"
              onClick={() => {
                submitHandler(value, path)
              }}
            >Save</button>
      }
    </div>
  )
}
