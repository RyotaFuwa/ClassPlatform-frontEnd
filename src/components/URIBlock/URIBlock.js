import React, {Component} from 'react';
import './URIBlock.css';

const URIBlock = (props) => {
  return (
    <div className='uri-block' >
      <p className='uri-block-title scrollable'>{props.title}</p>
    </div>
  )
}

export default URIBlock;
