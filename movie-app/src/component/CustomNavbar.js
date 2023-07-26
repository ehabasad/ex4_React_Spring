import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from "react-router-dom";

const CustomNavbar = ({cartItems}) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">
                Movie Shop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/search">
                        Search
                    </Nav.Link>
                    <Nav.Link as={Link} to="/cart">
                        Cart ({cartItems.length})
                    </Nav.Link>
                    <Nav.Link as={Link} to="/checkout">
                        Checkout
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
};

export default CustomNavbar;
