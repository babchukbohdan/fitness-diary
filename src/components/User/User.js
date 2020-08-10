import React, { useContext } from 'react'

import { FirebaseContext } from '../../context/firebase/firebaseContext'
import { AuthContext } from '../../context/auth/authContext'
import { useState } from 'react'
import { NotificationContext } from '../../context/Notification/notificationContext'

export const User = () => {
  const {showNotification} = useContext(NotificationContext)
  const {resetState} = useContext(FirebaseContext)
  const {logout, user} = useContext(AuthContext)

  const [userProfile, setUserProfile] = useState(user.displayName)

  const clickHandler = (e) => {
    logout()
    resetState()
  }


  return (
    <div className="wrap" >
      <h1>User Settings</h1>
      <div>
        Name
        <input
          className="input"
          type="text"
          value={userProfile || ''}
          onChange={(e) => {
            setUserProfile(e.target.value)
          }}
        />
        <button
          className="btn btn--border"
          onClick={() => {
            console.log('update username...')
            user.updateProfile({
              displayName: userProfile,
            }).then(() => {
              showNotification({
                closable: true,
                sticky: false,
                life: 3000,
                severity: 'success',
                summary: `Username updated`,
                detail: ``
              })
            })
          }}
        >save user name </button>
      </div>

      <button
        className="btn btn--border"
        onClick={clickHandler}
      >Sign out</button>
    </div>
  )
}
