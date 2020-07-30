import React, {Component} from 'react';
import './LinkBlock.css';

const LinkBlock = ({title, className, children, parent, line}) => {
  return (
    <div className={"block " + className} id={title.split(' ').join('')}>
      <div className="block-title"><a className='link' href={parent ? parent : '#'}>{title}</a></div>
      <div className="block-line1"> {line && <div className="w-100 border-basic"/>}</div>
      <div className="block-line2"> {line && <div className="w-100 border-basic"/>}</div>
      <div className="block-content">
        {children}
      </div>
    </div>
  )
}
export default LinkBlock;
