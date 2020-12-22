import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import TeamSqoud from './components/Pages/TeamSqoud';
import Match from './components/Pages/Match';
import CreateMatch from './components/Pages/CreateMatch';
import Dashboard from './components/Pages/Dashboard';
import './components/css/App.css'
import ShowPlayers from './components/Pages/ShowPlayers';
import LoginPage from './components/Pages/LoginPage';
import RegisterUser from './components/Pages/RegisterUser';
import ManagerControl from './components/Pages/ManagerControl'



const App = () => {

  const teamName = "Macabi tel aviv";
  
  return (
    <Router>
      <div className="App">
        <Navbar teamName={teamName} />
        <div className="container">
          <Switch>
           <Route exact path="/" component={LoginPage} />
            <Route exact path="/Manger" component={ManagerControl}/>
            <Route exact path="/TeamSqoud" component={TeamSqoud} />
            <Route exact path="/Match" component={Match} />
            <Route exact path="/CreateMatch" component={() => <CreateMatch nameTeam={teamName}/> } />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Test" component={CreateMatch} />
            <Route exact path="/ShowPlayers" component={ShowPlayers} />
            <Route exact path="/LoginPage" component={LoginPage}/>
            <Route exact path="/RegisterUser" component={RegisterUser}/>



          </Switch>
        </div>
        <div>
        </div>
      </div>
    </Router>
  );
};

export default App;
