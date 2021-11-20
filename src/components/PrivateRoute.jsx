import React from 'react';
import { userContext } from '../appContext/userContext';
import { useContext } from 'react';
import { useHistory } from 'react-router';

// routing
import { Route, Redirect } from 'react-router-dom';

// firebase
import { auth } from '../firebase/firebaseUtils';
import { useAuthState } from 'react-firebase-hooks/auth';

// styling
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PrivateRoute = ({ component: Component, props, ...rest }) => {
  const user1 = useContext(userContext);
  const [user, loading, error] = useAuthState(auth);
  const parentProps = props;
  console.log('pp = ', parentProps);

  if (parentProps.queryLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user || !user1) {
          // not logged in so redirect to login page with the return url

          return (
            <Redirect
              to={{ pathname: '/signin', state: { from: props.location } }}
            />
          );
        }

        // authorized so return component
        return <Component {...props} props={parentProps} />;
      }}
    />
  );
};

export default PrivateRoute;
