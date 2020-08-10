import React from 'react'
import './Email.scss'

export const Email = ({id}) => {
  return (
    <>
      <label className="email__label" htmlFor={id}>
        Email
      </label>
      <input
        id={id}
        className="email__input input"
        type="email"
        name="email"
        inputMode="email"
        autoComplete='email'
        autoFocus
        required
        placeholder='john.doe@gmail.com'
      />
    </>
  )
}
