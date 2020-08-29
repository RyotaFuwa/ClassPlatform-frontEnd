import React from 'react';
import './MessageBox.css';

const MessageBox = props => {
  const {message, himself} = props;
  const {author, createdAt} = message;
  const date = createdAt.toDate();
  return (
    <span
      className='message-box'
      style={{justifySelf: himself ? 'right' : 'left'}}>
      <div className='message-info'>
        <span className='name'>
          {himself ?
            '' :
            author.displayName
          }
        </span>
        <span className='date'>{date.getHours()}:{date.getMinutes()}</span>
      </div>
      <p className='inner-box' >
        {message.message}
      </p>
    </span>
  )
}
export default MessageBox;
