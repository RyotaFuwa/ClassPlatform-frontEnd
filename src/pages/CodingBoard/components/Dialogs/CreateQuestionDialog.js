import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {CATEGORY} from "../../consts";

export const CreateQuestionDialog = props => {
  const {name, difficulty, category, tags} = props.editingQuestion;
  return (
    <Dialog maxWidth='sm' open={props.open} fullWidth >
      <DialogTitle>Create a New Question</DialogTitle>
      <DialogContent>
        <div className='mb-5'>
          <TextField
            label='Name'
            value={name}
            onChange={e => props.onChange({name: e.target.value})}
            fullWidth
          />
        </div>
        <div className='mb-5'>
          <TextField
            label="Category"
            value={category}
            onChange={e => props.onChange({category: e.target.value})}
            select
            fullWidth
          >
            {
              CATEGORY.map(each => (
                <MenuItem key={each} value={each}>
                  {each}
                </MenuItem>
              ))
            }
          </TextField>
        </div>
        <div className='mb-5'>
          <Typography id="continuous-slider" gutterBottom>
            Difficulty
          </Typography>
          <Slider
            value={difficulty}
            valueLabelDisplay='auto'
            onChange={(e, v) => props.onChange({difficulty: v})}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onSubmit}> Create </Button>
        <Button onClick={props.onClose}> Cancel </Button>
      </DialogActions>
    </Dialog>
  )
}
