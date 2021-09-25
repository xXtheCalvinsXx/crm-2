import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom';
import { connect } from 'react-redux';

// redux
import { setCurrentUser } from './redux/user/user.actions';

// styling
import { GlobalStyles, Title } from './styles.js';

// components
import Timeline from './components/pages/TimelineView/Timeline';
import Header from './components/header/Header';
import Signup from './components/pages/Signup/Signup';
import Login from './components/pages/Login/Login';

function App() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => console.log(json));

  let history = useHistory();
  return (
    <div className='App'>
      <GlobalStyles />
      <Header />

      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/timeline' component={Timeline} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null)(App);
