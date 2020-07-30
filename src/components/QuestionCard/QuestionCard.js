import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import './QuestionCard.css';
import Badge from "react-bootstrap/Badge";
import Button from "@material-ui/core/Button";

function getColor(level) {
  if (!level)
    return 'white';
  if (level < 0) {
    return 'white';
  } else if (level > 100) {
    return 'black';
  } else {
    return `hsl(${209}, ${100}%, ${100 - level}%)`;
  }
}

const QuestionCard = props => {
  const [showTags, setShowTags] = useState(false);
  let tags = props.tags ? [...props.tags, props.category]: [props.category]
  let levelColor = getColor(props.level)
  let fontStyle = props.header ? {fontWeight: "bold", fontSize: 28} : {fontSize: 20};
  return (
    <div className="questioncard" style={{backgroundColor: props.new ? 'lightgoldenrodyellow' : null}}>
      <div className='questioncard-color' style={{backgroundColor: levelColor}} />
      <div className='questioncard-title scrollable' style={fontStyle}>
        <Link className='link' to={`/codingroom/${props.header ? props.question : props.title}`}>
          {props.title}
        </Link>
      </div>
      <div className='questioncard-tags link scrollable' onClick={() => setShowTags(!showTags)}>
        {(!showTags && !props.header) && <Button size='small'>tags</Button>}
        {showTags && tags.map(each => <Badge key={each} className="m-1" variant="secondary">{each}</Badge>)}
      </div>
    </div>
  )
}


export default QuestionCard;
