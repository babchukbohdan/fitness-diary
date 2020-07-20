import React from 'react'
import { useContext } from 'react'
import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { AuthContext } from '../../context/auth/authContext'

export const User = () => {
  const {resetState} = useContext(FirebaseContext)
  const {logout} = useContext(AuthContext)

  const clickHandler = (e) => {
    logout()
    resetState()
  }


  return (
    <div className="wrap" >
      <h1>User Settings</h1>
      <button
        className="btn"
        onClick={clickHandler}
      >Sign out</button>
    </div>
  )
}
