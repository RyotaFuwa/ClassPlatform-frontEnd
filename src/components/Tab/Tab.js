import React, {useState} from 'react';
import './Tab.css';

export const Tab = {
  Tab: props => {
    const [idx, setIdx] = useState(0);
    return (
      <div className='tab'>
        <div className='tab-panel'>
          {
            props.children.map((each, i) => (
              <div
                key={each.props.name} className='tab-button link'
                style={{
                  backgroundColor: i === idx ? 'lightgray' : null,
                  pointerEvents: each.props.disabled ? 'none' : null,
                  color: each.props.disabled ? 'lightgray' : null,
                }}
                onClick={() => setIdx(i)}
              >
                {each.props.name.toUpperCase()}
              </div>
            ))
          }
        </div>
        <div className='tab-block border-basic scrollable'>
          {props.children.map((each, i) =>
            <div key={i} className={each.props.className} style={{display: i === idx ? null : 'none'}}>
              {each}
            </div>
          )}
        </div>
      </div>
    )
  },
  Block: props => {
    return props.children;
  },
}
