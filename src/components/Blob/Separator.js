import React, {Component} from 'react';
import './Blob.css';

const Separator = props => {
    return (
      <div className='separator'
           onDragEnter={(e) => {
             let style = e.target.style;
             style.height = '100px';
             style.backgroundColor = '#C8C8CD';
             style.border = '3px dotted dimgray';
           }}
           onDragLeave={(e) => {
             let style = e.target.style;
             style.height = '20px';
             style.border = null;
             style.backgroundColor = null;
           }}
           onDragOver={e => e.preventDefault()}
           onDrop={(e) => {
             let style = e.target.style;
             style.height = '20px';
             style.border = null;
             style.backgroundColor = null;
             props.onDrop();
           }}
      />
)
}

export default Separator;
