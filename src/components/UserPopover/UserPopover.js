import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import './UserPopover.css';
import {Button} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import {auth, signInWithFacebook, signInWithGoogle} from "../../firebase/firebase.utils";
import {Link} from "react-router-dom";

const UserPopover = props => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if(!props.currentUser) return <span />
  return (
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        {props.currentUser.displayName}
      </Button>
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
            <Button> <Link className='admin' to='/admin'> Admin </Link></Button>
          </div>
          <div className='mb-3'>
          </div>
          <div className='mb-3'>
          </div>
          <div className='mt-3'>
            <Button onClick={() => auth.signOut()}>Log Out</Button>
          </div>
        </div>
      </Popover>
    </>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(UserPopover);
