// src/components/Header.js
import React from "react";

const Header = () => {
  return (
    <header className='site-header'>
      <div className='container header-inner'>
        <div>
          <h1 className='site-title'>Welcome to Our Site</h1>
          <p className='site-tagline'>Your tagline or motto goes here.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
