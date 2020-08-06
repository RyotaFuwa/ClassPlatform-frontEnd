import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {auth, signInWithFacebook, signInWithGoogle} from "../../firebase/firebase.utils";
import Popover from "@material-ui/core/Popover";
import './Register.css';

class SignInWithEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    let {email, password} = this.state;
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
    } catch(err) {
      alert(err.message + "if you don't have your account, plese sign up first.");
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
    let {open, email, password} = this.state;
    return (
      <>
        <Button fullWidth variant='contained' onClick={this.handleOpen}>Sign In With Email</Button>
        <Dialog open={open} onClose={this.handleClose} maxWidth='sm'>
          <DialogTitle>Sign In</DialogTitle>
          <form onSubmit={this.handleSubmit}>
            <DialogContent>
              <TextField fullWidth
                         className='mb-5'
                         name='email'
                         label='Email'
                         type='email'
                         value={email}
                         onChange={this.handleChange} />
              <TextField fullWidth
                         className='mb-5'
                         name='password'
                         label='Password'
                         type='password'
                         value={password}
                         onChange={this.handleChange} />
            </DialogContent>
            <DialogActions>
              <Button type='submit' color='primary' >Sign In</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    )
  }
}

export const SignIn = props => {
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
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        Sign In
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
            SIGN IN
          </div>
          <div className='mb-3'>
            <SignInWithEmail />
          </div>
          <div className='mb-3'>
            <Button fullWidth variant='contained' color='primary' onClick={signInWithGoogle}>With Google</Button>
          </div>
          <div className='mb-3'>
            <Button fullWidth variant='contained' color='primary' onClick={signInWithFacebook} disabled>With Facebook</Button>
          </div>
        </div>
      </Popover>
    </>
  );
}
