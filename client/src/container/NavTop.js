import React from "react";
import {
    Navbar,
    Nav,
    NavItem,
} from "react-bootstrap";
const NavTop = (props)=>{
    return <Navbar inverse fluid>
        <Navbar.Header>
            <Navbar.Brand>
                React-Bootstrap
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItem href='/home'>
                    Home
            </NavItem>
            <NavItem href='/about'>
                    About
            </NavItem>
        </Nav>
        <Nav pullRight={true}>
            <NavItem href={'/login'}>
                    Login
            </NavItem>
            <NavItem href={'/signup'}>
                    Sign Up
            </NavItem>
        </Nav>
    </Navbar>;
};
export default NavTop;