import React from 'react'
import { withRouter, Redirect } from 'react-router'
import { useCallback } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth/authContext'
import './Login.scss'
import { Email } from './Email/Email'
import { Password } from './Password/Password'
import { useState } from 'react'
import { ResetPass } from './ResetPass'

const Login = ({history}) => {
  const {user, login, resetPassword} = useContext(AuthContext)

  const [isResetPassword, setIsResetPassword] = useState(false)

  const handleLogin = useCallback( async (e) => {
      e.preventDefault()
      const {email} = e.target.elements
      const password = e.target.elements['current-password']
      login(email.value, password.value).then(() => {

      })
      // eslint-disable-next-line
    }, [history]
  )

  if (user?.emailVerified) {
    return <Redirect to="/progress" />
  }

  const loginForm = (
    <form className="login__form" onSubmit={handleLogin}>
      <section className="login__group">
        <Email id="login__email" />
      </section>

      <section className="login__group">
        <Password name="current-password" id="login__password" />
        <button
          className="reset-password"
          type="button"
          onClick={() => {setIsResetPassword(true)}}
        >Reset password</button>
      </section>

        <button className="login__submit btn btn--small btn--border" type="submit">Login</button>
    </form>
  )

  return (
    <div className="login">
      <h1 className="login__title">
        {isResetPassword ? 'Reset Password' : 'Login'}
      </h1>
      {
        isResetPassword
          ? <ResetPass
              hideReset={() => {setIsResetPassword(false)}}
              resetPassword={resetPassword}
            />
          : loginForm
      }
    </div>
  )
}

export default withRouter(Login)
