import React, {useCallback, useContext} from 'react'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../../context/auth/authContext'

import {ReactComponent as EyeIcon} from '../../images/eye.svg'
import './SignUp.scss'
import { useState } from 'react'

const SignUp = ({history}) => {
  const {signUp, user, resetPassword} = useContext(AuthContext)
  const [passType, setPassType] = useState('password')
  const [emailForReset, setEmailForReset] = useState('')

  const passTypeHandler = (e) => {
    if (passType === 'password') {
      setPassType('text')
    } else {
      setPassType('password')
    }
  }


  const handleSignUp = useCallback( async (e) => {
      e.preventDefault()
      const {email} = e.target.elements
      const password = e.target.elements['new-password']
      signUp(email.value, password.value)
      // eslint-disable-next-line
    }, [history]
  )

  return (
    <div className="signup">
      <h1 className="signup__title">Sign Up</h1>
      <form className="signup__form" onSubmit={handleSignUp}>
        <section className='signup__group' >
          <label className="signup__label" htmlFor="signup__email">
            Email
          </label>
          <input
            id='signup__email'
            className="signup__email"
            type="email"
            name="email"
            inputMode="email"
            autoComplete='email'
            autoFocus
            required
            placeholder='john.doe@gmail.com'
          />
        </section>

        <section className='signup__group' >
          <label className="signup__label" htmlFor="signup__password">
            Password
          </label>
          <input
            id='signup__password'
            className="signup__password"
            type={passType}
            minLength={6}
            maxLength={20}
            placeholder='Enter 6 - 20 characters'
            name="new-password"
            autoComplete="new-password"
            required
          />

          <button
            className="toggle-pass-btn"
            type="button"
            aria-label={
              passType === 'password'
                ? "Show password as plain text. Warning: this will display your password on the screen."
                : "Hide password"
            }
            onClick={passTypeHandler}
          >
            <EyeIcon
              className={
                passType === 'password'
                ? 'signup__icon'
                : 'signup__icon active'
              }
            />
            {/* Show password */}
          </button>
        </section>




        <button
          className="signup__submit btn"
          type="submit"
        >Sign Up</button>
      </form>


      <input
        className="signup__email"
        type="email"
        name="email"
        value={emailForReset}
        onChange={(e) => {
          setEmailForReset(e.target.value)
          console.log(e.target.value, 'emailForReset')
        }}
      />
      <button
          className="btn"
          type="button"
          onClick={() => {
            resetPassword(emailForReset)
          }}
        >reset password</button>
    </div>
  )
}

export default withRouter(SignUp)
