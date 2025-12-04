// src/components/Menu.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className='hamburger' onClick={toggleMenu}>
        ☰
      </div>
      <nav className={isOpen ? "active" : ""}>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/blog'>Blog</Link>
          </li>
          <li>
            <Link to='/spirituality'>Spirituality</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
