import React, {useCallback, useContext} from 'react'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../../context/auth/authContext'

import './SignUp.scss'
import { Password } from './Password/Password'
import { Email } from './Email/Email'

const SignUp = ({history}) => {
  const {signUp} = useContext(AuthContext)

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
        <section className='signup__group'>
          <Email id="signup__email" />
        </section>

        <section className='signup__group' >
          <Password name="new-password" id="signup__password" />
        </section>

        <button
          className="signup__submit btn"
          type="submit"
        >Sign Up</button>
      </form>
    </div>
  )
}

export default withRouter(SignUp)
