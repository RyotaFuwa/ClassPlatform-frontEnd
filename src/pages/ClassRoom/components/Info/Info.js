import {connect} from "react-redux";
import React from "react";
import {updateClass} from "../../../../firebase/firebase.firestore.classes";
import {Edit, Update, XSquare} from "../../../../icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import {setCurrentClass, updateCurrentClass} from "../../../../redux/class/class.actions";
import './Info.css';

// constants.
const CLASS_LEVEL = ['None', 'Easy', 'Intermediate', 'Advanced', 'Research'];
const TIME_UNIT = ['None', 'min', 'hour', 'day', 'week', 'month', 'year'];

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentClass: state.class.currentClass,
})

const mapDispatchToProps = dispatch => ({
  setCurrentClass: cls => dispatch(setCurrentClass(cls)),
  updateCurrentClass: updatingFields => dispatch(updateCurrentClass(updatingFields)),
})


// components.
const InfoEditDialog = connect(mapStateToProps, mapDispatchToProps)(props => {
  const admin = props.currentUser && props.currentUser.admin;
  const {author, level, duration, classId} = props.currentClass;

  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState({author, level, duration});

  const updateClassInfo = () => {
    updateClass(classId, info)
      .then(() => {
        props.updateCurrentClass(info);
        setOpen(false);
      })
      .catch(err => {
        alert('Failed to update the class.')
        console.log(err);
      })
  }

  return (
    <>
      {admin &&
      <Edit
        disabled={!admin}
        onClick={() => {
          setInfo({author, level, duration});
          setOpen(true)
        }}
      />
      }
      <Dialog fullWidth maxWidth='sm'  open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Info of Class</DialogTitle>
        <DialogContent>
          <div className='mb-5'>
            Author: &nbsp;
            <div className='ml-4'>
              <TextField
                margin="dense"
                label="Name"
                type="name"
                value={info.author.displayName}
                disabled
                fullWidth
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                value={info.author.email}
                disabled
                fullWidth
              />
            </div>
          </div>
          <div className='mb-5'>
            Level: &nbsp;
            <div className='m-4'>
              <TextField
                select
                label="Level"
                value={info.level}
                onChange={e => setInfo({...info, level: e.target.value})}
                fullWidth
              >
                {CLASS_LEVEL.map((each) => (
                  <MenuItem key={each} value={each}>
                    {each}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className='mb-5'>
            Duration: &nbsp;
            <div className='ml-4'>
              <TextField
                margin="none"
                label='Duration'
                type="number"
                value={info.duration.number}
                onChange={e => setInfo({...info, duration: {...info.duration, number: e.target.value}})}
                autoFocus
              />
              <span className='m-4' />
              <TextField
                select
                label="Unit"
                value={info.duration.unit}
                onChange={e => setInfo({...info, duration: {...info.duration, unit: e.target.value}})}
              >
                {TIME_UNIT.map((each) => (
                  <MenuItem key={each} value={each}>
                    {each}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Update onClick={() => updateClassInfo()} />
          <XSquare onClick={() => setOpen(false)}/>
        </DialogActions>
      </Dialog>
    </>
  );
})

const Info = connect(mapStateToProps)(props => {
  const {author, level, duration} = props.currentClass;
  return (
    <div className='info'>
      <div>
        <b>Author</b>
        <div>
          {author.displayName} &nbsp; &nbsp; [ {author.email} ]
        </div>
      </div>
      <div>
        <b>Level</b>
        <div>
          {level}
        </div>
      </div>
      <div>
        <b>Duration</b>
        <div>
          {duration.number === 0 ? '' : `${duration.number} ${duration.unit}`}
        </div>
      </div>
      <InfoEditDialog />
    </div>
  )
})

export default Info;