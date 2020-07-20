import React, { useState, useEffect } from 'react'
import { AuthContext } from './authContext'
import app from './base'

export const AuthState = ({children}) => {
  const [user, setUser] = useState(null)
  console.log(user, 'user')
  console.log(app, 'app')
  const auth = app.auth()
  console.log(auth, 'auth')
  // // const firestoreDB = app.firestore()
  // // console.log(firestoreDB, 'firestoreDB')

  useEffect(() => {
    auth.onAuthStateChanged(setUser)
  }, [])

  const login = async (email, pass) => {
    try {
      await auth.signInWithEmailAndPassword(email, pass)
    } catch (error) {
      alert(error)
    }
  }

  const signUp = async (email, pass) => {
    try {
      await auth.createUserWithEmailAndPassword(email, pass)
    } catch (error) {
      alert(error)
    }
  }

  const logout = () => {
    try {
      auth.signOut()
    } catch (error) {
      alert(error)
    }
  }

  const getName = () => {
    return auth.currentUser.displayName
  }



  return (
    <AuthContext.Provider value={{
      user,
      login, signUp, logout,
      getName
    }}>
      {children}
    </AuthContext.Provider>
  )
}
