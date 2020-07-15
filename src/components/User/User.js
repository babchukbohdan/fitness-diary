import React from 'react'
import app from "../../context/auth/base"
import { useContext } from 'react'
import { FirebaseContext } from '../../context/firebase/firebaseContext'

export const User = () => {
  const {resetState} = useContext(FirebaseContext)
  return (
    <div>
      <h1>User Settings</h1>
      <button
        onClick={() => {
          app.auth().signOut()
          resetState()
        }}
      >Sign out</button>
    </div>
  )
}
