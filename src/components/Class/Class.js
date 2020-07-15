import React, {Component, useState} from "react";
import {Accordion, Button} from "react-bootstrap";
import './Class.css'
import {Link} from "react-router-dom";
import Badge from "react-bootstrap/Badge";

const Class = ({theme, title, tags}) => {
  return (
      <Link className='class link' to={`classroom/${title}`}>
        <div className="theme" style={{backgroundColor: theme}}/>
        <h3 className="title"> {title} </h3>
        <div className='tags'>
          {tags.map((each, idx) => <Badge key={idx} className="m-1" variant='secondary'>{each}</Badge>)}
        </div>
      </Link>
  );
}

export default Class;
