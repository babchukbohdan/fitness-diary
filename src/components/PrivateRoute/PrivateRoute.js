import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth/authContext'

export const PrivateRoute = ({component: RouteComponent, ...rest}) => {
  const {user} = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!user
          ? (<RouteComponent {...routeProps} />)
          : ( <Redirect to={"/auth"} />)
      }
    />

  )
}
