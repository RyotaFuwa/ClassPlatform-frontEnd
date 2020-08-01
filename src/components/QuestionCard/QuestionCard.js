import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import './QuestionCard.css';
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

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

const QuestionCard = ({name, difficulty, category, tags, ...otherProps}) => {
  const [showTags, setShowTags] = useState(false);
  let tagsList = tags ?
    tags.split(',').map(each => each.replace(/^\s+|\s+$/g, '')) :
    [];
  tagsList = [...tagsList, category];
  let levelColor = getColor(difficulty)
  let fontStyle = otherProps.header ? {fontWeight: "bold", fontSize: 28} : {fontSize: 20};
  return (
    <div className="questioncard" style={{backgroundColor: otherProps.new ? 'lightgoldenrodyellow' : 'white'}}>
      <div className='questioncard-color' style={{backgroundColor: levelColor}} />
      <div className='questioncard-title scrollable' style={fontStyle}>
        <Link
          className='link'
          to={`/codingroom/${otherProps.header ? otherProps.question : name}`}
        >
          <span style={{color: otherProps.active ? 'black' : 'lightgray'}} >
            {name}
          </span>
        </Link>
      </div>
      <div className='questioncard-tags link scrollable' onClick={() => setShowTags(!showTags)}>
        {(!showTags && !otherProps.header) && <Button size='small'> tags </Button>}
        {showTags && tagsList.map(each => <Chip key={each} label={each} size='small' variant='default' />)}
      </div>
    </div>
  )
}


export default QuestionCard;
