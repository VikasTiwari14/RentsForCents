import React from 'react'
import Login from "./Pages/WelcomePage/Login/Login"
import MainPage from './Pages/WelcomePage/MainPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  return <div>
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/manager-dashboard"></Route>
        <Route exact path="/user-dashboard"></Route>
      </Switch>
    </Router>
  </div>
}

export default App;
