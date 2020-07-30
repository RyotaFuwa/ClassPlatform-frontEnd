import React, {useState} from 'react';
import {connect} from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavBar.css';
import Button from "@material-ui/core/Button";
import {SignUp} from "../Register/SignUp";
import {SignIn} from "../Register/SignIn";
import {Link} from "react-router-dom";
import UserPopover from "../UserPopover/UserPopover";


//TODO: redesign
const NavBar = props => {
  let admin = props.currentUser && props.currentUser.admin
  return (
    <Navbar bg='light' expand='sm'>
      <Navbar.Brand>
        <Link className='brand' to='/'>
          ClassPlatform {admin && 'Admin.'}
        </Link>
      </Navbar.Brand>

      <Navbar.Collapse>
        <Nav className='mr-auto'>
          <Button><Link className='link' to='/mydesk'>My Desk</Link></Button>
          <Button><Link className='link' to='/classboard'>Class Board</Link></Button>
          <Button><Link className='link' to='/codingboard'>Coding Board</Link></Button>

          <NavDropdown title="Warehouse">
            <NavDropdown.Item> Neural Network Architect </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item> UI Password </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item> Programming Language: Kitty </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {props.currentUser ?
            <UserPopover />
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
