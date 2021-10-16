import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core'

// Components
import Header from './components/pages/header/Header'
import Home from './components/pages/Home'
import Contacts from './components/pages/DatabaseView/DatabaseList'
import Card from './components/pages/DatabaseView/DatabaseCard'
import View from './components/pages/ContactView/ContactView'

// Theme
const theme = createTheme({
    typography: {
      fontFamily: [
        'Open Sans',
        'old',
      ].join(','),
    },
    palette: {
      primary: {
        main: '#CFD8DC'
      }
    }  
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/contacts">
              <Contacts />
            </Route>
            <Route path="/view">
              <View />
            </Route>
            <Route path="/card">
              <Card />
            </Route>
          </Switch>
        </Header>
      </Router>
    </ThemeProvider>
  );
}

export default App;