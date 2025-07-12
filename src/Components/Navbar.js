import React from 'react';
import { NavLink } from 'react-router-dom'; // Changed from Link to NavLink
import './Navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      <div className="navbar-content">
        <img src="/logo192.png" alt="Smart Solver Logo" className="logo" />
      <ul>
         <li>
          <NavLink 
            to="/mathCalculator" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            AI 
          </NavLink>
        </li>
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
      </div>
    </nav>
  );
}

export default Navbar;