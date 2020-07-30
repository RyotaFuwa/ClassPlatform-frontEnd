import React, {Component, useState} from 'react';
import './UnderConstruction.css';
import Dialog from "@material-ui/core/Dialog";
import {AppPage, Header, Page} from "../Page/Page";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import underConstruction from '../../data/under_construction.jpg';

const UnderConstruction = props => {
  const [open, setOpen] = useState(true);
    return (
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
          <AppPage>
            <div className='under-construction'>
              <img src={underConstruction} />
              <div className='title'>Under Construction</div>
              <Button className='close' onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </AppPage>
      </Dialog>
    )
}

export default UnderConstruction;
