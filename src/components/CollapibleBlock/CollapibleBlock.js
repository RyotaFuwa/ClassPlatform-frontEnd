import React, {Component, useState} from 'react';
import './CollapibleBlock.css';

function expandContent(e) {
    let content = e.currentTarget.parentElement.querySelector('.collapsible-content');
    if (content.style.height) {
      e.target.style.color = null;
      content.style.height = null;
    } else {
      e.target.style.color = 'lightgray';
      content.style.height = content.scrollHeight + "px";
    }
}

const CollapibleBlock = props => {
  return (
    <div className={props.className}>
      <div className='link' onClick={expandContent}>
        {props.title}
      </div>
      <div className='block-content collapsible-content'><span />{props.children}</div>
    </div>
  )
}
export default CollapibleBlock;
