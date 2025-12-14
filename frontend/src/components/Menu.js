import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='#home'>Brand</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/blog'>Blog</Nav.Link>
          <Nav.Link href='/spirituality'>Spirituality</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
