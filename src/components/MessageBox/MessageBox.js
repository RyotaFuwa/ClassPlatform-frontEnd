import React, {Component} from 'react';
import './MessageBox.css';

const MessageBox = props => {
    return (
      <div className='message-box' style={{color: props.color}} >
        {props.message}
      </div>
    )
}
export default MessageBox;
