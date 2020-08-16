import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {THEME} from "../../../ClassRoom/consts";

export const CreateClassDialog = props => {
  const {name, tags, theme} = props.editingClass;
  return (
    <Dialog fullWidth maxWidth='sm' open={props.open} onClose={props.onClose}>
      <DialogTitle>Create a New Class</DialogTitle>
      <DialogContent>
        <div className='mb-3'>
          <TextField
            label='Name'
            type="text"
            value={name}
            onChange={e => props.onChange({name: e.target.value})}
            fullWidth
          />
        </div>
        <div className='mb-5'>
          <TextField
            label='Tags'
            placeholder='Comma Separated'
            value={tags}
            onChange={e => props.onChange({tags: e.target.value})}
            fullWidth
          />
        </div>
        <div className='mb-5'>
          <TextField
            label='Theme'
            value={theme}
            onChange={e => props.onChange({theme: e.target.value})}
            select
            fullWidth
          >
            {Array.from(THEME, ([key, value]) =>
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            )}
          </TextField>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onSubmit}> Create </Button>
        <Button onClick={props.onClose}> Cancel </Button>
      </DialogActions>
    </Dialog>
  );
}
