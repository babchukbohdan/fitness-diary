import React, { useState } from 'react'

export const ResetPass = ({resetPassword}) => {
  const [emailForReset, setEmailForReset] = useState('')

  return (
    <div>
      <input
        className="signup__email"
        type="email"
        name="email"
        value={emailForReset}
        onChange={(e) => {
          setEmailForReset(e.target.value)
          console.log(e.target.value, 'emailForReset')
        }}
      />
      <button
          className="btn"
          type="button"
          onClick={() => {
            resetPassword(emailForReset)
          }}
        >reset password</button>
    </div>
  )
}
