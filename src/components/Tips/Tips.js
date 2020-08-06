import React, {Component} from 'react';
import './Tips.css';
import {Create, Delete} from "../../icons";
import CollapibleBlock from "../CollapibleBlock/CollapibleBlock";


const Tips = props => {
  if (props.editing) {
    return (
      <div className='tips text-center'>
        <div className='mt-3'>
          <Create  onClick={props.onAdd}/>
          <span className='m-1' />
          <Delete onClick={props.onDelete} />
        </div>

        <div className='tip-box'>
          {props.tips.map((helpTxt, idx) => (
            <div key={idx} className='w-100'>
              <div className='w-100 text-left'>Tip {idx + 1}</div>
              <textarea className='w-100 size-fixed' style={{height: '100px'}} value={helpTxt} onChange={e => props.onChange(idx, e)} />
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className='tips'>
        {props.tips.map((helpTxt, idx) => (
          <CollapibleBlock key={idx} title={`Tip ${idx + 1}`}><p>{helpTxt}</p></CollapibleBlock>
        ))}
      </div>
    )
  }
}

export default Tips;