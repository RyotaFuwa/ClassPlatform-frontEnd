import Button from "@material-ui/core/Button";
import React from "react";

const RunButton = props => {
  return (
    <Button
      className='run-button'
      fullWidth
      size='small'
      variant='contained'
      color="primary"
      onClick={props.onClick}
      disabled={props.running}
    >
      {props.running ? 'Not Available For Guests' : 'Run' }
    </Button>
  )
}

export default RunButton;
