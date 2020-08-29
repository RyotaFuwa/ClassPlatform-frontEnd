import {CATEGORY, DIFFICULTY} from "./consts";
import QuestionList from "../../components/QuestionList/QuestionList";
import React from "react";

export function categoricalSort(questions) {
  const categories = new Map(CATEGORY.map(each => [each, []]));
  for (let idx = 0; idx < questions.length; idx++) {
    let question = questions[idx];
    let category = question.category ? question.category : 'Misc';
    category = categories.has(category) ? category : 'Misc';
    categories.get(category).push(question);
  }

  let sortedQuestionList = [];
  let compareInteger = (a, b) => (a.difficulty >= b.difficulty);
  categories.forEach((questionList, key) => {
    sortedQuestionList.push(
      <QuestionList  key={key} name={key} type='vertical'
                     questions={questionList.sort(compareInteger)} />)
  });
  return <div className='questionboard-vertical'>{sortedQuestionList}</div>;
}

export function difficultySort(questions) {
  let questionsByLevel = Array.from(DIFFICULTY, each => ({...each, list: []}));
  for (let idx = 0; idx < questions.length; idx++) {
    let question = questions[idx];
    for (let jdx = 0; jdx < questionsByLevel.length; jdx++) {
      let eachDifficulty = questionsByLevel[jdx];
      if (question.difficulty < eachDifficulty.value) {
        eachDifficulty.list.push(question);
        break
      }
    }
  }
  return (
    <div className='questionboard-horizontal'>
      {questionsByLevel.map(each => {
        return <QuestionList type='horizontal' key={each.label} name={each.label}
                             questions={each.list.sort((a, b) => (a.difficulty >= b.difficulty))} />
      })}
    </div>
  )
}

export function randomSort(questions) {
  return (
    <div className='questionboard-horizontal'>
      <QuestionList type='horizontal' key={'All'} name='All' questions={questions} />
    </div>
  )
}
