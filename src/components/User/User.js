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
    <div>
      <h1>User Settings</h1>
      <button
        onClick={clickHandler}
      >Sign out</button>
    </div>
  )
}
