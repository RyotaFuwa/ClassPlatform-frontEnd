import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// eslint-disable-next-line
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

const admin = true;

const NavBar = props => {
  return (
    <Navbar className="navbar light">
      <Navbar.Brand href="/">Hi, Welcome :)</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className='mr-auto'>
          <Nav.Link href="mydesk">My Desk</Nav.Link>
          <Nav.Link href="/classboard">Class Board</Nav.Link>

          <Nav.Link href="/codingboard">Coding Board</Nav.Link>

          <NavDropdown title="Warehouse">
            <NavDropdown.Item href="#action/3.3">Neural Network Architect</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/uipasswd">UI Password</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="#action/3.2">Programming Language: Kitty</NavDropdown.Item>
          </NavDropdown>

          {admin && <Nav.Link href="admin">Setting</Nav.Link>}
        </Nav>
        <Nav>
          <Nav.Link href="#" onClick={e => SignUp(e)}>Sign Up</Nav.Link>
          <Nav.Link href="#" onClick={e => LogIn(e)}>Log In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function SignUp(e) {
  e.preventDefault();
  return (<div></div>)
}

function LogIn(e) {
  e.preventDefault();
  return (
    <Card variant="dark" style={{width: '20rem'}}>
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
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
