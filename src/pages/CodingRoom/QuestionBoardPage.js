import titlize from 'titlize';
import React, {Component} from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import SearchBox from '../../components/SearchBox/SearchBox';
import QuestionList from '../../components/QuestionList/QuestionList';
import ToggleButton from 'react-bootstrap/ToggleButton';

import './CodingRoom.css';
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Form from "react-bootstrap/Form";

const fetch = require('node-fetch');
const API_URL = 'http://localhost:3001/api';

const SORT_TYPE = [{name: 'CATEGORY', id: 0},
  {name: 'DIFFICULTY', id: 1},
  {name: 'ALL', id: 2},
];
const CATEGORY = [
  'Array',
  'String',
  'Heap',
  'Linked List',
  'Tree',
  'Graph',
  'Sorting',
  'Dynamic Programming',
]
const DIFFICULTY_LEVEL = [{level: 'Easy', value: 25},
  {level: 'Intermediate', value: 50},
  {level: 'Hard', value: 75},
  {level: 'Professional', value: Infinity},
];

class QuestionBoardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {name: '', id: -1},
      questionList: [],
      searchString: '',

      newQuestion: {title: '', category: '', level: '', tags: []},
      editingIdx: null,
    }
  }

  componentDidMount() {
    fetch(`${API_URL}/coding/questions/info`, {
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(json => {
        let questionList = json.questions.map((each, idx) =>
          <QuestionCard key={idx} title={titlize(each.title)} level={each.level}
                        category={each.category} tags={each.tags}/>);
        this.setState({questionList: questionList, sort: SORT_TYPE[0]});
      })
      .catch(rej => console.log(rej));
  }

  sortQuestions(questions) {
    switch (this.state.sort.id) {
      case 0:
        return this.categoricalSort(questions);
      case 1:
        return this.levelSort(questions);
      case 2:
        return this.randomSort(questions);
      default:
        break
    }
  }

  categoricalSort(questions) {
    const categories = new Map(CATEGORY.map(each => [each, []]));
    const misc = []; // leave misc category to push it at the end after sorting categories.
    for (let idx = 0; idx < questions.length; idx++) {
      let question = questions[idx];
      let category = question.props.category ? question.props.category : 'Misc';
      if (categories.has(category))
        categories.get(category).push(question);
      else
        misc.push(question);
    }
    let sortedQuestionList = [];
    let compareInteger = (a, b) => (a.props.level >= b.props.level);
    categories.forEach((value, key) => {
      sortedQuestionList.push(
        <QuestionList type='vertical' key={key} title={key} questions={value.sort(compareInteger)}/>)
    });
    if (misc.length > 0) {
      sortedQuestionList.push(
        <QuestionList type='vertical' key='Misc' title='Misc' questions={misc.sort(compareInteger)}/>
      );
    }
    return <div className='questionboard-vertical'> {sortedQuestionList} </div>;
  }

  levelSort(questions) {
    let questionsByLevel = Array.from(DIFFICULTY_LEVEL,
      each => ({level: each.level, value: each.value, list: []}));
    for (let idx = 0; idx < questions.length; idx++) {
      let question = questions[idx];
      for (let jdx = 0; jdx < questionsByLevel.length; jdx++) {
        let eachLevel = questionsByLevel[jdx];
        if (question.props.level < eachLevel.value) {
          eachLevel.list.push(question);
          break
        }
      }
    }
    return (
      <div className='questionboard-horizontal'>
        {questionsByLevel.map((each, idx) => {
          return <QuestionList type='horizontal' key={each.level} title={each.level}
                               questions={
                                 each.list.sort((a, b) => (a.props.level >= b.props.level)
                                 )}/>
        })}
      </div>
    )
  }

  randomSort(questions) {
    return (
      <div className='questionboard-horizontal'>
        <QuestionList type='horizontal' key={'All'} title='All' questions={questions}/>
      </div>
    )
  }

  createQuestion() {
    let title = titlize(document.forms['createQuestion']['title'].value);
    let category = document.forms['createQuestion']['category'].value;
    let level = document.forms['createQuestion']['level'].value;
    let tags = document.forms['createQuestion']['tags'].value.split(',').map(each => each.replace(/^\s+|\s+$/g, ''));
    fetch(`${API_URL}/coding/questions/info`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({question: {title: title, category: category, level: level, tags: tags}}),
    })
      .then((res) => {
        //TODO: make sure status code.
        console.log(res.status);
        if (res.status === 201) {
          this.setState(state => ({
            questionList: [...state.questionList,
              <QuestionCard key={state.questionList.length}
                            title={title} level={level} category={category} tags={tags} new/>
            ]
          }))
        }
      })
      .catch(rej => console.log(rej));
  }

  editQuestion() {
    let title = titlize(document.forms['editQuestion']['title'].value);
    let category = document.forms['editQuestion']['category'].value;
    let level = document.forms['editQuestion']['level'].value;
    let tags = document.forms['editQuestion']['tags'].value.split(',').map(each => each.replace(/^\s+|\s+$/g, ''));
    fetch(`${API_URL}/coding/questions/info`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({question: {title: title, category: category, level: level, tags: tags}}),
    })
      .then((res) => {
        //TODO: make sure status code.
        console.log(res.status);
        if (res.status === 201) {
          this.setState(state => ({
            questionList: [...state.questionList,
              <QuestionCard key={state.questionList.length}
                            title={title} level={level} category={category} tags={tags} new/>
            ]
          }))
        }
      })
      .catch(rej => console.log(rej));
  }

  deleteQuestion() {
    let idx = document.forms['deleteQuestion']['title'].value;
    let title = this.state.questionList[idx].props.title;
    fetch(`${API_URL}/coding/questions/info/${title}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then((res) => {
        //TODO: make sure status code
        console.log(res.status);
        if (res.status === 202) {
          this.setState(state => {
            let newQuestionList = [...state.questionList];
            newQuestionList.splice(idx, 1);
            return {questionList: newQuestionList};
          })
        }
      })
      .catch(rej => console.log(rej));
  }

  popOverCreate() {
    let categories = [...CATEGORY];
    let levels = [];
    categories.push('Misc');
    for (let idx = 0; idx < 100; idx++) {
      levels.push(<option key={idx}>{idx + 1}</option>);
    }
    //TODO: implement tag form field
    return (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Create a New Question</Popover.Title>
        <Popover.Content>
          <form className='form' name='createQuestion'>
            <div>
              <div>Question Title</div>
              <input name='title'
                     placeholder="Question Title"
              />
            </div>
            <div>
              <div>Category</div>
              <select name='category'>
                {categories.map((each, idx) => (
                  <option key={idx} value={each}>{each}</option>
                ))}
              </select>
            </div>
            <div>
              <div>Difficulty</div>
              <select name='level'>
                {levels}
              </select>
            </div>
            <div>
              <div>Tags</div>
              <input name='tags'
                     placeholder='Tags (Comma-Separated)'/>
            </div>
            <Button className='form-button' variant="primary"
                    onClick={() => this.createQuestion()}
            >
              Create
            </Button>
          </form>
        </Popover.Content>
      </Popover>
    );
  }

  popOverEdit() {
    let editingQuestion = this.state.editingIdx !== null ?
      this.state.questionList[this.state.editingIdx] : null;
    let title = editingQuestion ? editingQuestion.props.title : '';
    let level = editingQuestion ? editingQuestion.props.level : -1;
    let category = editingQuestion ? editingQuestion.props.category : '';
    let tags = editingQuestion ? editingQuestion.props.tags : [];

    let categories = [...CATEGORY];
    let levels = [];
    categories.push('Misc');
    for (let idx = 0; idx < 100; idx++) {
      levels.push(<option key={idx} selected={idx === level}>{idx + 1}</option>);
    }
    return (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Create a New Question</Popover.Title>
        <Popover.Content>
          <form className='form' name='editQuestion'>
            <div>
              <div>Question To Edit</div>
              <select name='titleList' onChange={() => {
                let idx = document.forms['editQuestion']['titleList'].value;
                this.setState({editingIdx: idx});
              }}>
                {this.state.questionList.map((each, idx) => (
                  <option key={idx} value={idx} title={each.props.title}>{each.props.title}</option>)
                ).sort((a, b) => (a.props.title >= b.props.title))}
              </select>
            </div>
            <div>
              <div>Question Title</div>
              <input name='title' defaultValue={title} placeholder='Not Selected'/>
            </div>
            <div>
              <div>Category</div>
              <select name='category'>
                {categories.map((each, idx) => (
                  <option key={idx} value={each} selected={each === category}>{each}</option>
                ))}
              </select>
            </div>
            <div>
              <div>Difficulty</div>
              <select name='level'> {levels} </select>
            </div>
            <div>
              <div>Tags</div>
              <input name='tags' defaultValue={tags.join(', ')}/>
            </div>

            <Button className='form-button' variant="success" onClick={() => this.editQuestion()}>
              Edit
            </Button>
          </form>
        </Popover.Content>
      </Popover>
    );
  }

  popOverDelete() {
    return (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Create a New Question</Popover.Title>
        <Popover.Content>
          <form className='form' name='deleteQuestion'>
            <div>
              <div>Question To Delete</div>
              <select name='title'>
                {this.state.questionList.map((each, idx) => (
                  <option key={idx} value={idx} title={each.props.title}>{each.props.title}</option>)
                ).sort((a, b) => (a.props.title >= b.props.title))}
              </select>
            </div>
            <Button className='form-button' variant="danger" onClick={() => this.deleteQuestion()}>
              Delete
            </Button>
          </form>
        </Popover.Content>
      </Popover>
    );
  }

  render() {
    return (
      <div className='page-normal'>
        <NavBar/>
        <div className='page-normal-main'>
          <div className='questionboard-header'>
            <h2 className='questionboard-title'>
              Question Board &nbsp;
              {true && (
                <span>
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={this.popOverCreate()}>
                                        <Button variant="primary"> + </Button>
                                    </OverlayTrigger> &nbsp;
                  <OverlayTrigger trigger="click" placement="bottom" overlay={this.popOverEdit()}>
                                        <Button variant="success"> > </Button>
                                    </OverlayTrigger> &nbsp;
                  <OverlayTrigger trigger="click" placement="bottom" overlay={this.popOverDelete()}>
                                        <Button variant="danger"> - </Button>
                                    </OverlayTrigger>
                                </span>
              )}
            </h2>
            <SearchBox className='questionboard-searchbox' placeholder='Search Question'
                       onChange={e => this.setState({searchString: e.target.value})}/>
            <div className='questionboard-sortpanel'>
              {
                SORT_TYPE.map((each) => (
                  <ToggleButton
                    className='m-1 p-2 text-center'
                    key={each.id}
                    type='radio'
                    variant='secondary'
                    checked={each === this.state.sort}
                    onChange={() => this.setState({sort: SORT_TYPE[each.id]})}
                  >
                    {each.name}
                  </ToggleButton>
                ))
              }
            </div>
          </div>
          {this.sortQuestions(this.state.questionList.filter(each =>
            (each.props.title.toLowerCase().includes(this.state.searchString.toLowerCase()))))}
        </div>
        <Footer/>

      </div>
    )
  }
}

export default QuestionBoardPage;