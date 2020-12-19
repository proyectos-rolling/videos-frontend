import React from 'react';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './logo.jpg';
import Modalito from './Modal';
import './App.css';
import Logo2 from './VIDEO.jpg';
const Menu = ({categories,setCategories}) => {
    return (
        <Navbar className="navbar" expand="lg">
            <Image src={Logo} className="logo" rounded />
            <Image src={Logo2} className="logo2" rounded />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Modalito categories={categories} setCategories={setCategories}/>
            </Navbar.Collapse>
        </Navbar>
        
    )
}

export default Menu