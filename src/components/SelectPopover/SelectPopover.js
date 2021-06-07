import React, {Component} from 'react';
import './SelectPopover.css';
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const SelectPopover = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
                               setAnchorEl(event.currentTarget);
                               };

  const handleClose = () => {
                          setAnchorEl(null);
                          };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button size='medium' variant="text" color={props.color ? props.color : 'default'} onClick={handleClick}>
        {props.value}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className='p-4'>
          <RadioGroup value={props.value} onChange={props.handleChange}>
            {props.options.map(each =>
              <FormControlLabel
                key={each.value}
                disabled={each.disabled}
                value={each.value}
                label={each.label}
                control={<Radio color={props.color ? props.color : 'default'} />} />
            )}
          </RadioGroup>
        </div>
      </Popover>
    </div>
  );
}
export default SelectPopover;
