import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useHistory,
  Redirect,
} from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';

// redux
import { setCurrentUser } from './redux/user/user.actions';
import { connect, useSelector } from 'react-redux';

// styling
import { GlobalStyles, Title } from './styles.js';

// components
import Timeline from './components/pages/TimelineView/Timeline';
import Header from './components/header/Header';
import Signup from './components/pages/Signup/Signup';
import Login from './components/pages/Login/Login';

// firebase
import { auth } from './firebase/firebaseUtils';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// firebase

function App() {
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     // ...
  //   } else {
  //     <Redirect to='/signin' />;
  //   }
  // });
  const [user, loading, error] = useAuthState(auth);

  let history = useHistory();
  return (
    <div className='App'>
      <GlobalStyles />
      <Header />

      <Switch>
        {/* <Route exact path='/' component={Login} /> */}
        <PrivateRoute exact path='/' component={Timeline} />
        {/* <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Login} /> */}
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
