import React from 'react'

export const Submit = ({value, postData}) => {

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
      <button className="btn btn-big"
        onClick={() => {
          submitHandler(value, path)
        }}
      >Save</button>
    </div>
  )
}
