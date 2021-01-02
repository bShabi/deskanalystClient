import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(sessionStorage.getItem('loginUser'));
    const permssion = user ? user.permission : ' ';

    this.state = {
      title: 'DeskAnalyst System',
      icon: 'fa fa-futbol',
      permssionUser: permssion,
    };
  }

  render() {
    const { icon, teamName, title, permssionUser } = this.state;
    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className={icon} /> {title}{' '}
        </h1>{' '}
        <ul>
          <li>
            <NavLink
              to='/Dashboard'
              exact
              activeStyle={{
                color: 'blue',
              }}>
              {' '}
              Home{' '}
            </NavLink>{' '}
          </li>{' '}
          <li>
            <NavLink
              to='/TeamSqoud'
              exact
              activeStyle={{
                color: 'blue',
              }}>
              {' '}
              Team Sqoud{' '}
            </NavLink>{' '}
          </li>{' '}
          <li>
            <NavLink
              to='/Match'
              exact
              activeStyle={{
                color: 'blue',
              }}>
              {' '}
              Match{' '}
            </NavLink>{' '}
          </li>{' '}
          {(permssionUser === 'Owner' || permssionUser === 'Analyst') && <li>
            <NavLink
              to='/CreateMatch'
              exact
              activeStyle={{
                color: 'blue',
              }}>
              {' '}
              Create Match{' '}
            </NavLink>
          </li>}
          {permssionUser === 'Owner' && <li>
            <NavLink
              to='/Manager'
              exact
              activeStyle={{
                color: 'blue',
              }}>
              Manager
            </NavLink>
          </li>}
        </ul>{' '}
      </nav>
    );
  }
}
