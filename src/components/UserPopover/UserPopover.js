import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import './UserPopover.css';
import {Button} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import {auth} from "../../firebase/firebase.utils";
import {Link} from "react-router-dom";
import {resetAll} from "../../redux/actions";

const UserPopover = props => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    auth.signOut();
    props.resetAll();
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if(!props.currentUser) return <span />
  return (
    <>
      <div className='displayName-button' onClick={handleClick}>
        {props.currentUser.displayName}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className='user-popover p-3'>
          <div className='title mb-5 text-center'>
            <b>My Account</b>
          </div>
          <div className='mb-3'>
            <Button><Link className='admin' to='/admin'>
              {props.currentUser.admin ? 'Admin' : props.currentUser.userType}
            </Link></Button>
          </div>
          <div className='mb-3'>
          </div>
          <div className='mb-3'>
          </div>
          <div className='mt-3'>
            <Button onClick={signOut}>Log Out</Button>
          </div>
        </div>
      </Popover>
    </>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

const mapDispatchToProps = dispatch => ({
  resetAll: () => dispatch(resetAll()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPopover);
