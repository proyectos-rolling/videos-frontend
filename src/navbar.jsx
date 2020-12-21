import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './logo.jpg';
import Modalito from './Modal';
import './App.css';
import Logo2 from './VIDEO.jpg';
import {Link} from  "react-router-dom";


const Menu = ({categories,setCategories}) => {
    return (
        <Navbar className="navbar" expand="lg">
           <Link to="/"><Image src={Logo} className="logo" rounded /> </Link>
           <Link to="/"> <Image src={Logo2} className="logo2" rounded /></Link>
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