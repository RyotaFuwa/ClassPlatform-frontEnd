import React, {useState} from 'react';
import {connect} from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavBar.css';
import {signInWithGoogle} from "../../firebase/firebase.utils";
import Button from "@material-ui/core/Button";
import { auth } from '../../firebase/firebase.utils';
import {SignUp} from "../Register/SignUp";
import {SignIn} from "../Register/SignIn";

const admin = true;

const NavBar = props => {
  let admin = props.currentUser && props.currentUser.admin
  return (
    <Navbar bg='light' expand='sm'>
      <Navbar.Brand href="/">
        <span className='brand'>
          ClassPlatform {admin && <span className='admin'> Admin</span>}
        </span>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav className='mr-auto'>
          <Nav.Link href="/mydesk">My Desk</Nav.Link>
          <Nav.Link href="/classboard">Class Board</Nav.Link>

          <Nav.Link href="/codingboard">Coding Board</Nav.Link>

          <NavDropdown title="Warehouse">
            <NavDropdown.Item href="#action/3.3">Neural Network Architect</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/uipasswd">UI Password</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="#action/3.2">Programming Language: Kitty</NavDropdown.Item>
          </NavDropdown>

          {admin && <Nav.Link href="/admin">Setting</Nav.Link>}

        </Nav>
        <Nav>
          {props.currentUser ?
            <>
              <Button>{props.currentUser.displayName}</Button>
              <Button onClick={() => auth.signOut()}>Log Out</Button>
            </>
            :
            <>
              <SignUp />
              <SignIn />
            </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(NavBar);
