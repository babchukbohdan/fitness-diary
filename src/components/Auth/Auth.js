import React from 'react'
import SignUp from './SignUp'
import Login from './Login'

export const Auth = () => {
  return (
    <div className="wrap">
      <Login />
      <SignUp />
    </div>
  )
}
