import React, {useCallback, useContext} from 'react'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../../context/auth/authContext'

import './SignUp.scss'

const SignUp = ({history}) => {
  const {signUp} = useContext(AuthContext)

  const handleSignUp = useCallback( async (e) => {
      e.preventDefault()
      const {email, password, name} = e.target.elements
      await signUp(email.value, password.value, name.value)
      // eslint-disable-next-line
    }, [history]
  )

  return (
    <div className="signup">
      <h1 className="signup__title">Sign Up</h1>
      <form className="signup__form" onSubmit={handleSignUp}>
        <label className="signup__label" htmlFor="">
          Name
          <input className="signup__name" type="text" name="name" placeholder="Name" />
        </label>
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
