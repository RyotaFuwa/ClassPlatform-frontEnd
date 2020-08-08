import React, {useState} from 'react';
import './UnderConstruction.css';
import Dialog from "@material-ui/core/Dialog";
import {AppPage} from "../Page/Page";
import {Button} from "@material-ui/core";

const UnderConstruction = props => {
  const [open, setOpen] = useState(true);
    return (
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
          <AppPage>
            <div className='under-construction'>
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
