import React, {Component} from 'react';
import './URIBlock.css';
import Button from "react-bootstrap/Button";

const URIBlock = (props) => {
  return (
    <div className='uri-block' >
      <p className='uri-block-title scrollable'>{props.title}</p>
    </div>
  )
}

export default URIBlock;
