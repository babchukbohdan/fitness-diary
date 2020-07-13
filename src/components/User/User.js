import React from 'react'
import app from "../../context/auth/base"

export const User = () => {
  return (
    <div>
      <h1>User Settings</h1>
      <button
        onClick={() => app.auth().signOut()}
      >Sign out</button>
    </div>
  )
}
