import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import {Alert, AlertTitle} from "@material-ui/lab"
import Button from "@material-ui/core/Button";
import React from "react";

export const DeleteClassDialog = props => {
  let hardDeleting = props.selectedIdx !== null && !props.classList[props.selectedIdx].active;
  return (
    <Dialog fullWidth maxWidth='sm'  open={props.open} onClose={props.onClose}>
      <DialogTitle>Delete a Class</DialogTitle>
      <DialogContent>
        <div className='mb-3'>
          Class to Delete: &nbsp;
          <div className='ml-4'>
            <TextField select margin="dense"  type="name"
                       value={props.selectedIdx !== null ? props.selectedIdx : props.classList.length}
                       onChange={e => props.onSelect(e.target.value)}
                       fullWidth>
              {props.classList.map((each, idx) => (
                <MenuItem key={each.name} value={idx}>
                  {each.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {hardDeleting &&
            <Alert severity="error">
              <AlertTitle>Hard Delete</AlertTitle>
              <strong>This class will be permanently deleted.</strong>
            </Alert>
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onSubmit()}>
          Delete
        </Button>
        <Button onClick={props.onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
