import React, {Component, useState} from "react";
import {Accordion, Button} from "react-bootstrap";
import './Class.css'
import {Link} from "react-router-dom";

const Class = ({theme, title, description, link}) => {
  return (
    <div className="class">
      <div className="theme" style={{backgroundColor: theme}}/>
      <Accordion defaultActiveKey="1" inline>
        <Accordion.Toggle as={Button} variant="text" eventKey="0">
          <h3 className="title"> {title} </h3>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <p>{description}</p>
        </Accordion.Collapse>
      </Accordion>
      <Link className='go-to-button' to={`classroom/${title}`}>
        <b>Go to Class Room</b>
      </Link>
    </div>
  );
}

export default Class;
