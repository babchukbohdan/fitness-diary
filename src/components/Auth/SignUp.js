import React from 'react'
import { withRouter, Redirect } from 'react-router'
import app from "../../context/auth/base"
import { useCallback } from 'react'
import './SignUp.scss'

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

  return (
    <div className="signup">
      <h1 className="signup__title">Sign Up</h1>
      <form className="signup__form" onSubmit={handleSignUp}>
        <label className="signup__label" htmlFor="">
          Email
          <input className="signup__email" type="email" name="email" placeholder="Email" />
        </label>
        <label className="signup__label" htmlFor="">
          Password
          <input className="signup__password" type="password" name="password" placeholder="Password" />
        </label>
        <button className="signup__submit" type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default withRouter(SignUp)
