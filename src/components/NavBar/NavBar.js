import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// eslint-disable-next-line
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

const NavBar = props => {
    return (
        <Navbar className="page-navbar navbar-expand-sm light">
            <Navbar.Brand href="/">Hi, Welcome :)</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="mydesk">My Desk</Nav.Link>
                    <Nav.Link href="/classroom">Class Room</Nav.Link>

                    <NavDropdown title="Coding Room" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/codingroom">Coding Room</NavDropdown.Item>
                        <NavDropdown.Item href="/questionboard">Question Board</NavDropdown.Item>
                        <NavDropdown.Item href="/codingchallenge">Coding Challenge</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Warehouse" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.3">Neural Network Architect</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.1">UI Password</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.2">Programming Language: Kitty</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#" onClick={SignUp()}>Sign Up</Nav.Link>
                    <Nav.Link href="#" onClick={LogIn()}>Log In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

function SignUp() {
    return (<div></div>)
}

function LogIn() {
    return (
        <Card variant="dark" style={{ width: '20rem'}}>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Log In
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default NavBar;
