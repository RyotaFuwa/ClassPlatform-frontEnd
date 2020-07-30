import React, {Component} from 'react';
import './ProjectFrame.css';
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";

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
        <div className='link-button'>
          <Button size='small' variant='contained' href={props.demo} disabled={!props.demo}>Demo</Button> &nbsp;
          <Button size='small' variant='contained' href={props.github} disabled={!props.github}>Github</Button>
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
