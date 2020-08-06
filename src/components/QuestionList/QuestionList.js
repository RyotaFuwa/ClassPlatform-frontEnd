import React, {Component} from 'react';
import QuestionCard from '../QuestionCard/QuestionCard';
import '../../js/random';

import './QuestionList.css';
import {Random} from "../../js/random";

const QuestionList = props => {
  switch (props.type) {
    case 'vertical':
      return (
        <div className='questionlist-vertical'>
          <div className='questionlist-title'>{getRandomQuestion(props.questions, props.name)}</div>
          <div className='questionlist-vertical-content'>
            {props.questions.map(each => <QuestionCard key={each.name} codingQuestion={each} />)}
          </div>
        </div>
      )
    case 'horizontal':
      return (
        <div className='questionlist-horizontal'>
          <div className='questionlist-line1'>
            <div className='w-100 border-basic'/>
          </div>
          <div className='questionlist-line2'>
            <div className='w-100 border-basic'/>
          </div>
          <div className='questionlist-title'>{getRandomQuestion(props.questions, props.name)}</div>
          <div className='questionlist-horizontal-content'>
            {props.questions.map(each => <QuestionCard key={each.name} codingQuestion={each}  />)}
          </div>
        </div>
      )
    default:
      return <div/>
  }
}

function getRandomQuestion(questions, category) {
  let codingQuestion = {header: true, name: category, active: true};
  if(questions.length === 0) {
    codingQuestion.question = '';
    return <QuestionCard codingQuestion={codingQuestion} />
  }
  let random = new Random();
  let card = random.chooseFrom(questions);
  codingQuestion.question = card.name
  return <QuestionCard codingQuestion={codingQuestion} />
}

export default QuestionList;
