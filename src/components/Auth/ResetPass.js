import React, { useState } from 'react'
import { useCallback } from 'react'
import { Email } from './Email/Email'

export const ResetPass = ({resetPassword, hideReset}) => {

  const handleResetPassword = useCallback( async (e) => {
    e.preventDefault()
    const {email} = e.target.elements
    console.log(email.value, 'email')
    resetPassword(email.value)
    // eslint-disable-next-line
    }, []
  )

  return (
    <form onSubmit={handleResetPassword}>
      <Email id='reset__pass' />
      <button
        className="btn btn--small btn--border"
        type="button"
        onClick={hideReset}
        style={{'marginRight': '10px'}}
      >Cancel</button>
      <button
        className="btn btn--small btn--border"
        type="submit"
      >Reset</button>
    </form>
  )
}
