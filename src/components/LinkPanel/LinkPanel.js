import React, {Component} from 'react';
import './LinkPanel.css';

const LinkPanel = props => {
  let {links, ...otherProps} = props;
  let panel = links.slice(0, -1).map((link, idx) => (
    <div key={link} className='linkpanel-title'>
      <a key={idx} className='link' href={`#${link.split(' ').join('')}`}>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="darkgray" strokeWidth="2" fill='darkblue' />
        </svg>
        <span className='m-1'> {link} </span>
      </a>
      <div className='line-between border-basic'/>
    </div>
  ))
  let lastLink = links.slice(-1)[0];
  panel.push(
    <div key={lastLink} className='linkpanel-title'>
      <a key={links.length - 1} className='link' href={`#${lastLink.split(' ').join('')}`}>
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" stroke="darkgray" strokeWidth="2" fill='darkblue' />
        </svg>
        <span className='m-1'> {lastLink} </span>
      </a>
    </div>
  )
  return (
    <div className='linkpanel'>
      {panel}
    </div>
  )
}
export default LinkPanel;
