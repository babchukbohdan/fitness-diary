import React from 'react'
import { withRouter, Redirect } from 'react-router'
import app from "../../context/auth/base"
import { useCallback } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth/authContext'
import './Login.scss'

const Login = ({history}) => {
  const handleLogin = useCallback(async (e) => {
      e.preventDefault()
      const {email, password} = e.target.elements

      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)

        history.push("/")
      } catch (error) {
        alert(error)
      }
    }, [history]
  )

  const {user} = useContext(AuthContext)

  if (user) {
    return <Redirect to="/user" />
  }

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      <form className="login__form" onSubmit={handleLogin}>
        <label htmlFor="" className="login__label">
          Email
          <input className="login__email" type="email" name="email" placeholder="Email" />
        </label>
        <label className="login__label" htmlFor="">
          Password
          <input className="login__password" type="password" name="password" placeholder="Password" />
        </label>
        <button className="login__submit" type="submit">Login</button>
      </form>
    </div>
  )
}

export default withRouter(Login)
