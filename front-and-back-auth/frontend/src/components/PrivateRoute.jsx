import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/users/signin',
          state: { from: props.location }
        }} />
  )} />
)

export default PrivateRoute;
