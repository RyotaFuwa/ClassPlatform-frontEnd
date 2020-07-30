import React, {Component} from 'react';
import './ProjectFrame.css';
import CollapibleBlock from "../CollapibleBlock/CollapibleBlock";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const ProjectFrame = props => {
  return (
    <div className='project-frame'>
      <div className='project-media'>
        {(props.gif || props.img) &&
          <img src={props.gif ? props.gif : props.img} alt="no visual"/>
        }
        {!(props.gif || props.img) && <p>No visual</p>}
      </div>
      <div className="project-txt">
        <div className='title'>{props.title}</div>
        <div className='link'>
          <Button className='btn-sm btn-secondary' href={props.demo} disabled={!props.demo}> Demo</Button> &nbsp;
          <Button className='btn-sm btn-secondary' href={props.github} disabled={!props.github}> Github</Button>
        </div>
        <div className='desc'>
          {props.description ? props.description.map((each, idx) => <p key={idx}> {each}</p>) : []}
        </div>
        <div className='tags'>
          {props.tags ? props.tags.map(
            (each, idx) => <Badge key={idx} className="m-1" variant="secondary">{each}</Badge>) : []}
        </div>
      </div>
    </div>
  )
}
export default ProjectFrame;
