import React, { useState, useEffect } from 'react'
import { AuthContext } from './authContext'
import app from './base'
import { useContext } from 'react'
import { NotificationContext } from '../Notification/notificationContext'

export const AuthState = ({children}) => {
  const auth = app.auth()
  auth.useDeviceLanguage()
  const [user, setUser] = useState(auth.currentUser)
  const {showNotification} = useContext(NotificationContext)


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
            showNotification({
              closable: true,
              sticky: true,
              // life: 3000,
              severity: 'success',
              summary: `Verify email`,
              detail: `We send you email with verify link. Please reload browser after confirming email.`
            })
          })
          .catch(function(error) {
            // Error occurred. Inspect error.code.
            showNotification({
              closable: true,
              sticky: true,
              // life: 3000,
              severity: 'error',
              summary: `Can't send verify email`,
              detail: `Problem ${error}.Please try again`
            })
          });
      }
    })
  }, [auth, showNotification])

  const login = async (email, pass) => {
    try {
      await auth.signInWithEmailAndPassword(email, pass)
      showNotification({
        closable: true,
        sticky: false,
        life: 3000,
        severity: 'success',
        summary: `Welcome to fitness diary`,
        detail: ''
      })
    } catch (error) {
      showNotification({
        closable: true,
        sticky: true,
        severity: 'error',
        summary: `Can't log in`,
        detail: `Problem ${error}. Please try again`
      })
    }
  }

  const signUp = async (email, pass) => {
    try {
      await auth.createUserWithEmailAndPassword(email, pass)
      showNotification({
        closable: true,
        sticky: false,
        life: 10000,
        severity: 'success',
        summary: `User created`,
        detail: `Next step: verify email adress on ${email}.`
      })
    } catch (error) {
      showNotification({
        closable: true,
        sticky: true,
        severity: 'error',
        summary: `Can't sign up`,
        detail: `Problem ${error}.Please try again`
      })
    }
  }

  const resetPassword = (email) => {
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
      showNotification({
        closable: true,
        sticky: true,
        severity: 'success',
        summary: `Reset Password`,
        detail: `We send u email with reset link to ${email}.`
      })
    }).catch(function(error) {
      // An error happened.
      showNotification({
        closable: true,
        sticky: true,
        severity: 'error',
        summary: `Can't Reset Password`,
        detail: `Problem ${error}.Please try again`
      })
    });
  }


  const logout = () => {
    try {
      auth.signOut().then(() => {
        showNotification({
          closable: true,
          sticky: false,
          life: 3000,
          severity: 'success',
          summary: `You are logged out`,
          detail: ``
        })
      })
    } catch (error) {
      showNotification({
        closable: true,
        sticky: true,
        // life: 3000,
        severity: 'error',
        summary: `Can't log out`,
        detail: `Problem ${error}.Please try again`
      })
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
