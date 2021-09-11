import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom';
import Timeline from './components/pages/TimelineView/Timeline';

// import ContactView from './components/pages/ContactView/ContactView';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup/Signup';
import Login from './components/pages/Login/Login';
import { GlobalStyles, Title } from './styles.js';

function App() {
  let history = useHistory();
  return (
    <div className='App'>
      <GlobalStyles />
      <Title>CRM</Title>
      <Router>
        <Switch>
          <Route path='/home' component={Login} />
          <Route path='/timeline' component={Timeline} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
