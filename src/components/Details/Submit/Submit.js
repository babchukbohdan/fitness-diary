import React from 'react'
import { Loader } from '../../UI/Loader/Loader'

export const Submit = ({value, postData, loading}) => {

  const today = new Date()
  const path = `${today.getFullYear()}/${today.getMonth() + 1}`

  const submitHandler = (data, path) => {
    data = {...data}
    delete data.id
    postData(data, path)
      .then(() => {
        console.log('added training day');
      })
      .catch((e) => {
        console.log('Error server post method');
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
