import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Timeline from './components/pages/TimelineView/Timeline';
// import ContactView from './components/pages/ContactView/ContactView';
import Home from './components/pages/Home';

function App() {
  return (
    <div className='App'>
      <p>I am a page!</p>
      <Router>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/timeline' component={Timeline} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
