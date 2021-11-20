import React, { useEffect, useState, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// redux
// import { setCurrentUser } from './redux/user/user.actions';
// import { connect, useSelector } from 'react-redux';

// styling
import { GlobalStyles } from './styles.js';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// components
import Timeline from './components/pages/TimelineView/Timeline';
import Header from './components/header/Header';
import Signup from './components/pages/Signup/Signup';
import Login from './components/pages/Login/Login';
import Database from './components/pages/DatabaseView/Database';

// firebase
import { auth } from './firebase/firebaseUtils';
import { useAuthState } from 'react-firebase-hooks/auth';

// axios
import axios from 'axios';
import getContacts from './axios/getContacts';
import getEvents from './axios/getEvents';

// user context
import { userContext } from './appContext/userContext';
import { ContactsProvider } from './appContext/contactsContext';

const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans', 'old'].join(','),
  },
  palette: {
    primary: {
      main: '#cfd8dc',
      secondary: '#344955',
    },
  },
});

function App() {
  const [user, loading] = useAuthState(auth);
  const [queryLoading, setQueryLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [events, setEvents] = useState([]);
  // let contacts = useRef();
  // let events = useRef();
  const contactEventData = useRef([]);

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

  // let data;
  // let events;

  useEffect(() => {
    const getData = async () => {
      if (!events?.current?.length > 0 && user) {
        console.log(events);
        const tempc = (await getContacts(user)).data;
        const tempe = (await getEvents(user)).data;
        // contacts.current = tempc;
        // events.current = tempe;
        if (tempe) {
          console.log('temp e = ', tempe.length);
          setEvents(tempe);
          setContacts(tempc);
          console.log(events);
          console.log(contacts);
        }
      }

      setTimeout(function () {
        console.log('I am the third log after 5 seconds');
      }, 3000);
    };
    // setQueryLoading(true);
    getData();
    setQueryLoading(false);
    console.log('exoted axio');

    // to add error handling
  }, [user]);

  if (loading || queryLoading) {
    console.log('still loading');
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

  console.log('loading = ', queryLoading);

  console.log(user);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />

        <userContext.Provider value={user}>
          <ContactsProvider contacts={[]}>
            <Switch>
              <PrivateRoute
                exact
                path='/'
                component={Timeline}
                props={{
                  contacts: contacts,
                  events: events,
                  queryLoading: queryLoading,
                  contactEventData: contactEventData,
                }}
              />

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
              <PrivateRoute
                exact
                path='/contacts'
                component={Database}
                props={{
                  contacts: contacts,
                  events: events,
                  queryLoading: queryLoading,
                  contactEventData: contactEventData,
                }}
              />
            </Switch>
          </ContactsProvider>
        </userContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
