import React,{useState} from 'react'
import Login from "./Pages/WelcomePage/Login/Login"
import MainPage from './Pages/WelcomePage/MainPage';
import ManagerDashboard from './Pages/ManagerDashboard/ManagerDashboard';
import UserDashboard from './Pages/UserDashboard/UserDashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  const [isLog, setIsLog] = useState(true);
  return <div>
    <Router>
      <Switch>
        <Route exact path="/"><MainPage setIsLog={setIsLog} isLog={isLog}/> </Route>
        <Route exact path="/login"><Login isLog={isLog} /></Route>
        <Route exact path="/manager-dashboard"><ManagerDashboard /></Route>
        <Route exact path="/user-dashboard"><UserDashboard /></Route>
      </Switch>
    </Router>
  </div>
}

export default App;
