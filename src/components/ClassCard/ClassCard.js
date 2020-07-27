import React, {Component, useState} from "react";
import './ClassCard.css'
import {Link} from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import CollapibleBlock from "../CollapibleBlock/CollapibleBlock";
import {Button} from "@material-ui/core";
import algorithm from "../../data/algorithm.jpg";

const ClassCard = ({title, imgURL}) => {
  // check if imgURL does return a valid img
  return (
    <Link className='link' to={`classroom/${title}`}>
      <div className="class-card">
        <div className='img'>
          <img src={imgURL} style={{display: imgURL ? null : 'none'}}/>
        </div>
        <div className='title'>{title}</div>
      </div>
    </Link>
  );
}

export default ClassCard;
