import React, { Component } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(sessionStorage.getItem('loginUser'));
    const permssion = user ? user.permission : null;
    const firstName = user ? user.firstName : null;
    const lastName = user ? user.lastName : null;


    this.state = {
      title: 'DeskAnalyst System',
      icon: 'fa fa-futbol',
      permssionUser: permssion,
      firstName: firstName,
      lastName: lastName
    };
    console.log(user)

  }

  render() {
    const { icon, firstName, lastName, title, permssionUser } = this.state;
    console.log(this.state)
    return (
      <nav className='navbar bg-primary'>
        <h4>
          <i className={icon} /> {title}
        </h4>
        {firstName &&
          <span> Hello  {firstName} {lastName}, [ {permssionUser} ] </span>
        }
        <ul>
          <li>
            <NavLink
              className="nav-links"
              to='/home'
              exact
              activeStyle={{
                color: 'blue',
              }}>

              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-links"

              to='/TeamSqoud'
              exact
              activeStyle={{
                color: 'blue',
              }}>

              Team Sqoud
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-links"

              to='/Match'
              exact
              activeStyle={{
                color: 'blue',
              }}>

              Match
            </NavLink>
          </li>
          {(permssionUser === 'Owner' || permssionUser === 'Analyst') && (
            <li>
              <NavLink
                className="nav-links"

                to='/CreateMatch'
                exact
                activeStyle={{
                  color: 'blue',
                }}>

                Create Match
              </NavLink>
            </li>
          )}
          {permssionUser === 'Owner' && (
            <li>
              <NavLink
                className="nav-links"

                to='/Accounts'
                exact
                activeStyle={{
                  color: 'blue',
                }}>

                Accounts
              </NavLink>
            </li>
          )}
          {permssionUser === 'Owner' && (
            <li>
              <NavLink
                className="nav-links"

                to='/Teams'
                exact
                activeStyle={{
                  color: 'blue',
                }}>

                Teams
              </NavLink>
            </li>
          )}
          {permssionUser && (
            <IconButton
              className="nav-links"

              onClick={() => {
                sessionStorage.clear()
                this.setState({ permssionUser: null })
                window.location.reload(false);
              }}
            >
              <ExitToAppIcon />
            </IconButton>


          )}
        </ul>
      </nav>
    );
  }
}
