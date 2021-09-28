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
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// components
import Timeline from './components/pages/TimelineView/Timeline';
import Header from './components/header/Header';
import Signup from './components/pages/Signup/Signup';
import Login from './components/pages/Login/Login';
import DatabaseCard from './components/pages/DatabaseView/DatabaseCard';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'old',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#cfd8dc'
    }
  }  
});


function App() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => console.log(json));

  let history = useHistory();
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <GlobalStyles />
        <Header />

        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/timeline' component={Timeline} />
          <Route path='/signup' component={Signup} />
          <Route path='/databasecard' component={DatabaseCard} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null)(App);