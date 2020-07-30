import React, {Component, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {auth, createNewUserIfNoMatch, createNewUserWithGoogle, signInWithGoogle} from "../../firebase/firebase.utils";
import Popover from "@material-ui/core/Popover";

class SignUpWithEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    let {displayName, email, password, confirmPassword} = this.state;
    if(password !== confirmPassword) {
      alert('password mismatched')
      return;
    }

    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      await createNewUserIfNoMatch(user, {displayName});
    } catch(err) {
      alert(err.message);
    }
    this.handleClose();
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({ [name]: value});
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    let {open, displayName, email, password, confirmPassword} = this.state;
    return (
      <>
        <Button fullWidth variant='contained' onClick={this.handleOpen}>Sign Up With Email</Button>
        <Dialog open={open} onClose={this.handleClose} maxWidth='sm'>
          <DialogTitle>Sign Up</DialogTitle>
          <form onSubmit={this.handleSubmit}>
            <DialogContent>
              <TextField fullWidth
                         className='mb-4'
                         name='displayName'
                         label='Name'
                         type='text'
                         value={displayName}
                         onChange={this.handleChange} />
              <TextField fullWidth
                         className='mb-4'
                         name='email'
                         label='Email'
                         type='email'
                         value={email}
                         onChange={this.handleChange} />
              <TextField fullWidth
                         className='mb-4'
                         name='password'
                         label='Password'
                         type='password'
                         value={password}
                         onChange={this.handleChange} />
              <TextField fullWidth
                         className='mb-4'
                         name='confirmPassword'
                         label='ConFirm Password'
                         type='password'
                         value={confirmPassword}
                         onChange={this.handleChange} />
            </DialogContent>
            <DialogActions>
              <Button type='submit' color='primary' >Sign Up</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    )
  }
}

export const SignUp = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        Sign Up
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
        <div className='p-3'>
          <div className='mb-3 text-center'>
            SIGN UP
          </div>
          <div className='mb-3'>
            <SignUpWithEmail />
          </div>
        </div>
      </Popover>
    </div>
  );
}