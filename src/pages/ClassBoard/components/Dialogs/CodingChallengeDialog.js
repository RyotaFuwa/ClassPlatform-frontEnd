import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

export const CodingChallengeDialog = props => {
  return (
    <>
      <Dialog maxWidth='sm' open={props.open} fullWidth>
        <DialogTitle>Coding Challenge</DialogTitle>
        <DialogContent>
          <div className='m-5'>
            <TextField autoFocus margin="dense" label="Question Code" type="name" fullWidth/>
          </div>
          <div className='m-5'>
            <TextField autoFocus margin="none" label='Session Key' type="password" fullWidth/>
          </div>
        </DialogContent>

        <DialogActions>
          <Button className='btn-none' onClick={() => console.log('fetch question and go to coding room')}>
            Enter
          </Button>
          <Button className='btn-none' onClick={props.onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
