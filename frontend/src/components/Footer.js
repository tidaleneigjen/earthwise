// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className='site-footer'>
      <div className='container'>
        <p className='muted'>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
