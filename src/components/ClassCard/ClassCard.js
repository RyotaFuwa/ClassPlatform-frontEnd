import React, {Component, useState} from "react";
import './ClassCard.css'
import {Link} from "react-router-dom";

const ClassCard = ({name, imgURL, active}) => {
  // check if imgURL does return a valid img
  return (
    <Link className='link' to={`/classroom/${name}`}>
      <div className="class-card">
        <div className='img'>
          <img src={imgURL} style={{display: imgURL ? null : 'none'}}/>
        </div>
        <div className='title' style={{color: !active ? 'lightgray' : 'black' }}>{name}</div>
      </div>
    </Link>
  );
}

export default ClassCard;
