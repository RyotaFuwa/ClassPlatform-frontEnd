import React, {Component, useState} from 'react';
import './NotFound.css';
import Dialog from "@material-ui/core/Dialog";
import {AppPage} from "../Page/Page";
import spaceMan from "../../data/space_man.jpg";
import {Button} from "@material-ui/core";

const NotFound = props => {
  const [open, setOpen] = useState(true);
  if(props.inline) {
    return <span>Page Not Found</span>
  }
  else if(props.dialog) {
    return  (
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        <AppPage>
          <div className='not-found'>
            <img src={spaceMan} />
            <div className='title'>404 Not Found</div>
            <Button className='close' onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </AppPage>
      </Dialog>
    )
  }
  else if (props.page) {
    return (
      <Dialog open={open} fullScreen>
        <AppPage>
          <div className='not-found'>
            <div className='title'>404 Not Found</div>
          </div>
        </AppPage>
      </Dialog>
    )
  }
  else {
    return <div>Page Not Found</div>
  }
}
export default NotFound;
