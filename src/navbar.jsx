import React from 'react';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './logo.jpg';
import Modalito from './Modal';
import './App.css';

const Menu = () => {
    return (
        <Navbar className="navbar" expand="lg">
            <Image src={Logo} className="logo" rounded />
            <Navbar.Brand className="text-danger" href="#home">YOUPUBLIC</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Modalito />
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu