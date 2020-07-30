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
          <div className='questionlist-title'>{getRandomQuestion(props.questions, props.title)}</div>
          <div className='questionlist-vertical-content'>
            {props.questions.map(each => <QuestionCard key={each.title} {...each} />)}
          </div>
        </div>
      )
    case 'horizontal':
      return (
        <div className='questionlist-horizontal'>
          <div className='questionlist-title'>{getRandomQuestion(props.questions, props.title)}</div>
          <div className='questionlist-line1'>
            <div className='w-100 border-basic'/>
          </div>
          <div className='questionlist-line2'>
            <div className='w-100 border-basic'/>
          </div>
          <div className={'questionlist-horizontal-content'}>
            {props.questions.map(each => <QuestionCard key={each.title} {...each} />)}
          </div>
        </div>
      )
    default:
      return <div/>
  }
}

function getRandomQuestion(questions, category) {
  if(questions.length === 0) {
    return <QuestionCard header title={category} question=''/>
  }
  let random = new Random();
  let card = random.chooseFrom(questions);
  return <QuestionCard header title={category} question={card.title}/>
}

export default QuestionList;
