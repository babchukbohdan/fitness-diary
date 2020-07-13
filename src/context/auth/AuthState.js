import React, { useState, useEffect } from 'react'
import { AuthContext } from './authContext'
import app from './base'

export const AuthState = ({children}) => {
  const [user, setUser] = useState(null)
  console.log(user, 'user')

  useEffect(() => {
    app.auth().onAuthStateChanged(setUser)
  }, [])

  return (
    <AuthContext.Provider value={{
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}
