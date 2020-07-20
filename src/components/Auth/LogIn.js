import React from 'react'
import { withRouter, Redirect } from 'react-router'
import { useCallback } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth/authContext'
import './Login.scss'

const Login = ({history}) => {
  const {user, login} = useContext(AuthContext)

  const handleLogin = useCallback( (e) => {
      console.log(e.target.elements)
      e.preventDefault()
      const {email} = e.target.elements
      const password = e.target.elements['current-password']
      login(email.value, password.value)
      // eslint-disable-next-line
    }, [history]
  )

  if (user) {
    return <Redirect to="/user" />
  }

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      <form className="login__form" onSubmit={handleLogin}>
        <label htmlFor="" className="login__label">
          Email
          <input
            className="login__email"
            type="email"
            name="email"
            placeholder=" "
            autoComplete="email"
          />
        </label>
        <label className="login__label" htmlFor="">
          Password
          <input
            className="login__password"
            type="password"
            name="current-password"
            autoComplete="current-password"
          />
        </label>
        <button className="login__submit btn" type="submit">Login</button>
      </form>
    </div>
  )
}

export default withRouter(Login)
