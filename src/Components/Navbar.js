import React from 'react';
import { NavLink } from 'react-router-dom'; // Changed from Link to NavLink
import './Navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <NavLink 
            to="/calculators" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Calculators
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/converters" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Converters
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;