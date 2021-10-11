import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useHistory,
  Redirect,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// redux
import { setCurrentUser } from './redux/user/user.actions';
import { connect, useSelector } from 'react-redux';

// styling
import { GlobalStyles, Title } from './styles.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// components
import Timeline from './components/pages/TimelineView/Timeline';
import Header from './components/header/Header';
import Signup from './components/pages/Signup/Signup';
import Login from './components/pages/Login/Login';
import Home from './components/pages/Home';

// firebase
import { auth } from './firebase/firebaseUtils';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// axios
import axios from 'axios';

// user context
import { userContext } from './appContext/userContext';

function App() {
  const [user, loading, error] = useAuthState(auth);
  axios.defaults.baseURL =
    'https://australia-southeast1-xxthecalvinsxx.cloudfunctions.net/api/';

  let userSessionTimeout = null;

  auth.onAuthStateChanged((user) => {
    if (user === null && userSessionTimeout) {
      clearTimeout(userSessionTimeout);
      userSessionTimeout = null;
    } else if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        const authTime = idTokenResult.claims.auth_time * 1000;
        const sessionDurationInMilliseconds = 60 * 1000 * 60; // 60 min
        const expirationInMilliseconds =
          sessionDurationInMilliseconds - (Date.now() - authTime);
        userSessionTimeout = setTimeout(
          () => auth.signOut(),
          expirationInMilliseconds
        );
      });
    }
  });

  console.log(user);

  let history = useHistory();

  if (loading) {
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
  } else
    return (
      <div className='App'>
        <GlobalStyles />
        <Header />

        <userContext.Provider value={user}>
          <Switch>
            <PrivateRoute exact path='/' component={Timeline} />

            <Route
              exact
              path='/signup'
              render={() => (user ? <Redirect to='/' /> : <Signup />)}
            />
            <Route
              exact
              path='/signin'
              render={() => (user ? <Redirect to='/' /> : <Login />)}
            />
          </Switch>
        </userContext.Provider>
      </div>
    );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
