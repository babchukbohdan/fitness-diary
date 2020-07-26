import React, { useState, useEffect } from 'react'
import { AuthContext } from './authContext'
import app from './base'

export const AuthState = ({children}) => {
  const auth = app.auth()
  const [user, setUser] = useState(auth.currentUser)
  auth.useDeviceLanguage()
  console.log(user, 'user')
  // // const firestoreDB = app.firestore()
  // // console.log(firestoreDB, 'firestoreDB')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)

      if (user && !user.emailVerified) {
        const actionCodeSettings = {
          // change before deploy
          url: 'http://localhost:3000/user'
        };
        user.sendEmailVerification(actionCodeSettings)
          .then(function() {
            // Verification email sent.
            console.log('We send you email with verify link')
          })
          .catch(function(error) {
            // Error occurred. Inspect error.code.
          });
      }
    })
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

  const resetPassword = (email) => {
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
      console.log('We send u email with reset link')
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });
  }


  const logout = () => {
    try {
      auth.signOut()
    } catch (error) {
      alert(error)
    }
  }

  const deleteUser = () => {
    user.delete().then(() => {
      // User deleted.
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <AuthContext.Provider value={{
      user,
      login, signUp, logout,
      resetPassword, deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}
