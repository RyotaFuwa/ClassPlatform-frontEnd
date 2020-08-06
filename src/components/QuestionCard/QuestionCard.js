import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './QuestionCard.css';
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import {setCurrentCodingQuestion} from "../../redux/coding/coding.actions";

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
  const {name, difficulty, category, tags, header, question, active, outStanding} = props.codingQuestion;
  let tagsList = tags ? tags.split(',').map(each => each.replace(/^\s+|\s+$/g, '')) : [];
  tagsList = [...tagsList, category];
  let levelColor = getColor(difficulty)
  let fontStyle = header ? {fontWeight: "bold", fontSize: '1.5em'} : {fontSize: '1.2em'};
  return (
    <div className="questioncard" style={{backgroundColor: outStanding ? 'lightgoldenrodyellow' : 'white'}} >
      <div className='color' style={{backgroundColor: levelColor}} />
      <div className='title text-center scrollable' style={fontStyle} >
        <Link
          className='link'
          onClick={() => props.setCurrentCodingQuestion(props.codingQuestion)}
          to={`/codingroom/${header ? question : name}`}
        >
          <span style={{color: active ? 'black' : 'lightgray'}} >
            {name}
          </span>
        </Link>
      </div>
      <div className='tags link scrollable' onClick={() => setShowTags(!showTags)}>
        {(!showTags && !header) && <Button size='small'> tags </Button>}
        {showTags && tagsList.map(each => <Chip key={each} className='m-1' label={each} size='small' variant='default' />)}
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentCodingQuestion: question => dispatch(setCurrentCodingQuestion(question))
})

export default connect(null, mapDispatchToProps)(QuestionCard);