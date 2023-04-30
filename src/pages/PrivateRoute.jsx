import React from 'react';
import { Route,Navigate} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children}) => {
  const {isAuthenticated, user}= useAuth0()
  const isUserTrue = isAuthenticated && user;
  if (!isUserTrue) {
    return (
      <Navigate to='/login' />
    )
 
  }
return children
}
export default PrivateRoute;
