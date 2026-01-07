import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getBackendOrigin } from "../api";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const backendOrigin = getBackendOrigin();
  const adminUrl = backendOrigin ? `${backendOrigin}/admin/` : "/admin/";

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className='nav'>
      <div className='container nav-inner'>
        <button
          type='button'
          className='nav-toggle'
          aria-label='Toggle menu'
          aria-expanded={isOpen}
          aria-controls='primary-navigation'
          onClick={() => setIsOpen((v) => !v)}
        >
          Menu
        </button>

        <ul
          id='primary-navigation'
          className={isOpen ? "nav-links open" : "nav-links"}
        >
          <li>
            <NavLink to='/' onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/blog' onClick={closeMenu}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to='/books' onClick={closeMenu}>
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to='/links' onClick={closeMenu}>
              Links
            </NavLink>
          </li>
          <li>
            <NavLink to='/spirituality' onClick={closeMenu}>
              Spirituality
            </NavLink>
          </li>
          <li>
            <a href={adminUrl} onClick={closeMenu}>
              Author Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
