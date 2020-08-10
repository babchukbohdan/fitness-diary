import React, { useState } from 'react'
import {ReactComponent as EyeIcon} from '../../../images/eye.svg'
import './Password.scss'

export const Password = ({name, id}) => {
  const [passType, setPassType] = useState('password')

  const passTypeHandler = (e) => {
    if (passType === 'password') {
      setPassType('text')
    } else {
      setPassType('password')
    }
  }

  return (
    <>
      <label className="password__label" htmlFor={id}>
        Password
      </label>
      <div className="password__container">
        <input
          id={id}
          className='password__input input'
          type={passType}
          minLength={6}
          maxLength={20}
          placeholder='Enter 6 - 20 characters'
          name={name}
          autoComplete={name}
          required
        />

        <button
          className="password__toggle-btn"
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
              ? 'password__icon'
              : 'password__icon active'
            }
          />
          {/* Show password */}
        </button>
      </div>
    </>
  )
}
