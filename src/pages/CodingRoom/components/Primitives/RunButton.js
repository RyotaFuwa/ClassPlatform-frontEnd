import Button from "@material-ui/core/Button";
import React from "react";

export const RunButton = props => {
  return (
    <Button
      className='run-button'
      fullWidth
      size='small'
      variant='contained'
      color="primary"
      onClick={props.onClick}
      disabled={props.running || props.disabled}
    >
      RUN
    </Button>
  )
}

export const SubmitButton = props => {
  return (
    <Button
      className='run-button'
      fullWidth
      style={{marginLeft: '0.25rem', backgroundColor: 'darkseagreen', color: "white"}}
      size='small'
      variant='contained'
      disabled={props.disabled}
    >
      SUBMIT
    </Button>
  )
}

