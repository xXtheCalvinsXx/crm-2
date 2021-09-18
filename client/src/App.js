import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Contacts from './components/pages/ContactView/ContactView'
import { createTheme, ThemeProvider } from '@material-ui/core'
import SideNavBar from './components/pages/SideNavBar/SideNavBar'


const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SideNavBar>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/contacts">
              <Contacts />
            </Route>
          </Switch>
        </SideNavBar>
      </Router>
    </ThemeProvider>
  );
}

export default App;