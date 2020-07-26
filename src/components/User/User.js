import React, { useContext } from 'react'

import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { AuthContext } from '../../context/auth/authContext'
import { useState } from 'react'

export const User = () => {
  const {resetState} = useContext(FirebaseContext)
  const {logout, user} = useContext(AuthContext)

  const [userProfile, setUserProfile] = useState('')

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

      <div>
        Name
        <input type="text"
          value={userProfile}
          onChange={(e) => {
            setUserProfile(e.target.value)
          }}
        />
        <button
          onClick={() => {
            console.log('update username...')
            user.updateProfile({
              displayName: userProfile,
            }).then(() => {
              console.log('username updated')
            })
          }}
        >save user name </button>
      </div>


    </div>
  )
}
