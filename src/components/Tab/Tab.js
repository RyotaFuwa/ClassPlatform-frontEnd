import React, {Component, useState} from 'react';
import './Tab.css';

const Tab = props => {
  const [idx, setIdx] = useState(0);
  return (
    <div className='tab'>
      <div className='tab-panel'>
        {
          props.children.map((each, i) => (
            <div key={i} className='tab-button link'
                 style={{
                   backgroundColor: i === idx ? 'lightgray' : null,
                   pointerEvents: each.props.disabled ? 'none' : null,
                   color: each.props.disabled ? 'lightgray' : null,
                 }}
                 onClick={() => {
                   setIdx(i)
                 }}>
              {each.props.tabName.toUpperCase()}
            </div>
          ))}
      </div>
      <div className='tab-block border-basic'>
        {props.children[idx]}
      </div>
    </div>
  )
}

const TabBlock = props => {
  return (
    <div className={`w-100 h-100 ${props.className}`}>
      {props.children}
    </div>
  )
}

export {Tab, TabBlock};
