import React from 'react'
import { withRouter, Redirect } from 'react-router'
import app from "../../context/auth/base"
import { useCallback } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth/authContext'

const SignUp = ({history}) => {
  const handleSignUp = useCallback(async (e) => {
      e.preventDefault()
      const {email, password} = e.target.elements

      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)

        history.push("/")
      } catch (error) {
        alert(error)
      }
    }, [history]
  )

  const {user} = useContext(AuthContext)

  if (!user) {
    return <Redirect to="/auth" />
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label htmlFor="">
          Email
          <input type="email" name="email" placeholder="Email" />
        </label>
        <label htmlFor="">
          Password
          <input type="password" name="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default withRouter(SignUp)
