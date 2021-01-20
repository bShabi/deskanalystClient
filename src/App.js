import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { TeamSqoud } from './components/Pages/TeamSqoud';
import { Match } from './components/Pages/Match';
import { CreateMatch } from './components/Pages/CreateMatch';
import { Home } from './components/Pages/Home';
import './components/css/App.css';
import ShowPlayers from './components/Pages/ShowPlayers';
import { LoginPage } from './components/Pages/LoginPage';
import RegisterUser from './components/Pages/RegisterUser';
import ManagerControl from './components/Pages/Manger/ManagerControl';
import { Accounts } from './components/Pages/Manger/Account/Accounts';
// import { RemoveAccountPage } from './components/Pages/Manger/Account/RemoveAccountPage';
import UpdateUser from './components/Pages/Manger/ManagerControl';
import { AddTeamPage } from './components/Pages/Manger/Team/AddTeamPage';
import { Teams } from './components/Pages/Manger/Team/Teams'



const App = () => {





  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={LoginPage} />
            <Route exact path='/Manager' component={ManagerControl} />
            {/* <Route exact path='/Manager/AddAccountPage' component={AddAccountPage} /> */}
            <Route exact path='/Accounts' component={Accounts} />
            <Route
              exact
              path='/Manager/UpdateUser'
              component={ManagerControl}
            />
            <Route
              exact
              path='/Manager/SearchUser'
              component={ManagerControl}
            />
            <Route exact path='/TeamSqoud' component={TeamSqoud} />
            <Route exact path='/Manager/AddTeam' component={AddTeamPage} />
            <Route exact path='/Teams' component={Teams} />

            <Route exact path='/Match' component={Match} />
            <Route
              exact
              path='/CreateMatch'
              component={() => <CreateMatch />}
            />
            <Route exact path='/Home' component={Home} />
            <Route exact path='/Test' component={CreateMatch} />
            <Route exact path='/ShowPlayers' component={ShowPlayers} />
            <Route exact path='/LoginPage' component={LoginPage} />
            <Route exact path='/RegisterUser' component={RegisterUser} />
          </Switch>
        </div>
        <div> </div>
      </div>
    </Router>
  );
};

export default App;
