import React, {Component, useState} from "react";
import './ClassCard.css'
import {Link} from "react-router-dom";

const ClassCard = props => {
  const { name, active, imageUrl } = props.class;
  // check if imgURL does return a valid img
  return (
    <Link className='link' to={`/classroom/${name}`}>
      <div className="class-card">
        <div className='img'>
          {imageUrl && <img src={imageUrl}/> }
        </div>
        <div className='title' style={{color: !active ? 'lightgray' : 'black' }}>{name}</div>
      </div>
    </Link>
  );
}


export default ClassCard;
