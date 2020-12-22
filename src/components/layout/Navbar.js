import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ icon, title ,teamName }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon}  /> {title} 
      </h1>
      <h2> My Team: {teamName}</h2>
      <ul>
        <li>
          <NavLink to="/" exact activeStyle={{color:'blue'}}>Home </NavLink>
        </li>
        <li>
          <NavLink to="/TeamSqoud" exact activeStyle={{color:'blue'}}>Team Sqoud</NavLink>
        </li>
        <li>
          <NavLink to="/Match" exact activeStyle={{color:'blue'}}>Match </NavLink>
        </li>
        <li>
          <NavLink to="/CreateMatch" exact activeStyle={{color:'blue'}}>Create-Match </NavLink>
        </li>
        <li>
          <NavLink to="/Dashboard" exact activeStyle={{color:'blue'}}>Dashboard </NavLink>
        </li>
      </ul>
    </nav>
  );
};
Navbar.defaultProps = {
  title: 'DeskAnalyst System',
  icon: 'fa fa-futbol',
  teamName: 'None'
};
export default Navbar;
