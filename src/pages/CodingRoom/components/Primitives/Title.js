import {Update} from "../../../../icons";
import React from "react";

const Title = props => {
  return (
    <div className='title'>
      {props.name}
      {props.admin &&
        <span className='btn-group'>
            <Update
              disabled={props.name === 'Coding Room'}
              onClick={props.handleClick}
            />
        </span>
      }
    </div>
  )
}

export default Title;