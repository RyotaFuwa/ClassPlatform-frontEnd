import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Dropzone from "react-dropzone";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {THEME} from "../../../ClassRoom/consts";

export const EditClassDialog = props => {
  const {name, tags, theme, imageUrl} = props.editingClass;
  return (
    <Dialog fullWidth maxWidth='sm'  open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit a Class</DialogTitle>
      <DialogContent>
        <div className='mb-5'>
          <TextField
            select
            placeholder='Class to Edit'
            value={props.selectedIdx !== null ? props.selectedIdx : props.classList.length}
            onChange={e => props.onSelect(e.target.value)}
            fullWidth
          >
            {
              props.classList.map((each, idx) => (
                <MenuItem key={each.name} value={idx}>
                  {each.name}
                </MenuItem>
              ))
            }
          </TextField>
        </div>
        <div className='mb-3 text-center'>
          Image
          <Dropzone onDrop={acceptedFiles => props.handleDrop(acceptedFiles[0])}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {imageUrl ?
                    <img className='image-box' src={imageUrl} /> :
                    <div className='image-box'/>
                  }
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className='mb-3'>
          <TextField margin="dense"
                     label='Name'
                     value={name}
                     onChange={e => props.onChange({name: e.target.value})}
                     fullWidth />
        </div>
        <div className='mb-3'>
          <TextField
            label='Tags'
            placeholder='Comma Separated'
            value={tags}
            onChange={e => props.onChange({tags: e.target.value})}
            fullWidth
          />
        </div>
        <div className='mb-3'>
          <TextField
            select
            label='Theme'
            value={theme}
            onChange={e => props.onChange({theme: e.target.value})}
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
        <Button onClick={() => props.onSubmit()}>
          Edit
        </Button>
        <Button onClick={props.onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
