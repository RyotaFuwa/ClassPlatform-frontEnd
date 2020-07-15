import titlize from 'titlize';
import React, {Component, useState} from 'react';
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
import {intRange} from "../../js/misc";

const fetch = require('node-fetch');
const API_URL = 'http://localhost:3001/api';

const SORT_TYPE = [{name: 'CATEGORY', id: 0}, {name: 'DIFFICULTY', id: 1}, {name: 'ALL', id: 2}];
const CATEGORY = [ 'Array', 'String', 'Heap', 'Linked List', 'Tree', 'Graph', 'Sorting', 'Dynamic Programming'];
const DIFFICULTY_LEVEL = [{level: 'Easy', value: 25}, {level: 'Intermediate', value: 50},
  {level: 'Hard', value: 75}, {level: 'Professional', value: Infinity}];


const CreateQuestionForm = props => {
    return (
      <form className='form' onSubmit={e => {e.preventDefault(); props.onSubmit()}}>
        <label>
          <div>Title</div>
          <input onChange={e => props.setTitle(e.target.value)} />
        </label>
        <label>
          <div>Category</div>
          <select onChange={e => props.setCategory(e.target.value)}>
            {[...CATEGORY, 'Misc'].map(category => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
        <label>
          <div>Level</div>
          <select onChange={e => props.setLevel(e.target.value)}>
            {intRange(1, 101).map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </label>
        <label>
          <div>Tags</div>
          <input placeholder='Comma Separated' onChange={e => props.setTags(e.target.value)} />
        </label>
        <Button className='form-button' variant="primary" type="submit">
          Create
        </Button>
      </form>
    )
}

const EditQuestionForm = props => {
  let editingQuestion = props.questionList[props.editingIdx];
  return (
    <form className='form' onSubmit={e => {e.preventDefault(); props.onSubmit()}}>
      <label>
        <div>Question to Edit</div>
        <select value={props.editingIdx} onChange={(e) => props.setIdx(e.target.value)}>
          {props.questionList
            .map((each, idx) => <option key={idx} value={idx} title={each.title}>{each.title}</option>)
            .sort((a, b) => (a.props.title >= b.props.title))
          }
        </select>
      </label>
      <label>
        <div>Title</div>
        <input value={editingQuestion.title} onChange={e => props.setTitle(e.target.value)} />
      </label>
      <label>
        <div>Category</div>
        <select value={editingQuestion.category} onChange={e => props.setCategory(e.target.value)}>
          {[...CATEGORY, 'Misc'].map(category => <option key={category} value={category}>{category}</option>)}
        </select>
      </label>
      <label>
        <div>Level</div>
        <select value={editingQuestion.level} onChange={e => props.setLevel(e.target.value)}>
          {intRange(1, 101).map(num => <option key={num} value={num}>{num}</option>)}
        </select>
      </label>
      <label>
        <div>Tags</div>
        <input value={editingQuestion.tags.join(', ')} placeholder='Comma Separated' onChange={e => props.setTags(e.target.value)} />
      </label>

      <Button className='form-button' variant="success" type="submit">
        Edit
      </Button>
    </form>
  )
}

const DeleteQuestionForm = props => {
  const [sure, setSure] = useState(false);
  return (
    <form className='form' onSubmit={e => {
      if(sure) {
        e.preventDefault();
        props.onSubmit();
      }
      else {
        setSure(true);
      }
    }}>
      <label>
        <div>Question to Delete</div>
        <select value={0} onChange={(e) => props.setIdx(e.target.value)}>
          {props.questionList
            .map((each, idx) => <option key={idx} value={idx} title={each.title}>{each.title}</option>)
            .sort((a, b) => (a.props.title >= b.props.title))
          }
        </select>
      </label>
      {!sure &&
        <Button className='form-button' variant='danger' onClick={() => setSure(true)}>
          Delete
        </Button>
      }
      {sure &&
        <span>
          <Button className='form-button m-1' variant="danger" type="submit">
            Sure
          </Button>
          <Button className='form-button m-1' variant="secondary" onClick={() => setSure(false)}>
            Nah
          </Button>
        </span>
      }
    </form>
  )
}

class QuestionBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {name: '', id: -1},
      questionList: [],
      searchString: '',

      popup: null,
      admin: true,

      //new question info
      idx: 0,
      title: '',
      level: 1,
      category: CATEGORY[0],
      tags: '', //convert it into list on submit
    }
  }

  componentDidMount() {
    fetch(`${API_URL}/coding/questions/info`, { headers: {'Content-Type': 'application/json'}})
      .then(res => res.json())
      .then(json => {
        this.setState({questionList: json.questions, sort: SORT_TYPE[0]})})
      .catch(rej => console.log(rej));
  }

  renderAdmin() {
    let theme = ['primary', 'success', 'danger'];
    let symbol = ['+', '>', '-'];
    return (
      <span className='m-2'>
        {[0, 1, 2].map(idx =>
        <Button className='m-1' variant={theme[idx]}
                onClick={() => this.setState(state => ({popup: state.popup === null ? symbol[idx] : null}))}>
          {symbol[idx]}
        </Button>)}
      </span>
    )
  }

  renderPopup() {
    switch(this.state.popup) {
      case "+":
        return <CreateQuestionForm onSubmit={() => this.createQuestion()}
                                   setTitle={title => this.setState({title: title})}
                                   setLevel={level => this.setState({level: level})}
                                   setCategory={category => this.setState({category: category})}
                                   setTags={tags => this.setState({tags: tags})} />
      case ">":
        if(this.state.questionList.length > 0) {
          return <EditQuestionForm questionList={this.state.questionList}
                                   onSubmit={() => this.editQuestion()}
                                   setIdx={idx => this.setState({idx: idx})}
                                   setTitle={title => this.setState({title: title})}
                                   setLevel={level => this.setState({level: level})}
                                   setCategory={category => this.setState({category: category})}
                                   setTags={tags => this.setState({tags: tags})}
                                   editingIdx={this.state.idx}/>
        }
        else {
          return <div>
            No Question Found
            <Button className='m-2 btn-sm btn-secondary' onClick={() => this.setState({popup: null})}>Close</Button>
          </div>
        }
        case "-":
          if(this.state.questionList.length) {
            return <DeleteQuestionForm questionList={this.state.questionList}
                                       onSubmit={() => this.deleteQuestion()}
                                       setIdx={idx => this.setState({idx: idx})}/>
          }
          else {
            return <div>
              No Question Found
              <Button className='m-2 btn-sm btn-secondary' onClick={() => this.setState({popup: null})}>Close</Button>
            </div>
          }
      default:
        break;
    }
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
    const misc = [];
    for (let idx = 0; idx < questions.length; idx++) {
      let question = questions[idx];
      let category = question.category ? question.category : 'Misc';
      if (categories.has(category)) {
        categories.get(category).push(question);
      }
      else {
        misc.push(question);
      }
    }
    let sortedQuestionList = [];
    let compareInteger = (a, b) => (a.level >= b.level);
    categories.forEach((questionList, key) => {
      sortedQuestionList.push(
        <QuestionList type='vertical' key={key} title={key} questions={
          questionList.sort(compareInteger).map(each => <QuestionCard key={each.title} {...each} />)}/>)
    });
    if (misc.length > 0) {
      sortedQuestionList.push(
        <QuestionList type='vertical' key='Misc' title='Misc' questions={
          misc.map(each => <QuestionCard key={each.title} {...each} />).sort(compareInteger)}/>
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
        if (question.level < eachLevel.value) {
          eachLevel.list.push(question);
          break
        }
      }
    }
    return (
      <div className='questionboard-horizontal'>
        {questionsByLevel.map(each => {
          return <QuestionList type='horizontal' key={each.level} title={each.level}
                               questions={each.list.sort((a, b) => (a.level >= b.level))
                               .map(each => <QuestionCard key={each.title} {...each} />)}
          />})}
      </div>
    )
  }

  randomSort(questions) {
    return (
      <div className='questionboard-horizontal'>
        <QuestionList type='horizontal' key={'All'} title='All' questions={questions.map(
          each => <QuestionCard key={each.title} {...each} />)}/>
      </div>
    )
  }


  createQuestion() {
    let newQuestion = {title: this.state.title,
      category: this.state.category,
      level: this.state.level,
      tags: this.state.tags.split(',').map(each => each.replace(/^\s+|\s+$/g, '')),
    }
    console.log(newQuestion);
    /*
    fetch(`${API_URL}/coding/questions/info`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({question: newQuestion}),
    })
      .then((res) => {
        if (res.status === 201) {
          newQuestion.new = true;
          this.setState(state => ({ questionList: [...state.questionList, newQuestion]}));
        }
      })
      .catch(rej => console.log(rej));
     */
  }

  editQuestion() {
    let title = titlize(document.forms['editQuestion']['title'].value);
    let category = document.forms['editQuestion']['category'].value;
    let level = Number(document.forms['editQuestion']['level'].value);
    let tags = document.forms['editQuestion']['tags'].value.split(',').map(each => each.replace(/^\s+|\s+$/g, ''));
    fetch(`${API_URL}/coding/questions/info/${this.state.questionList[this.state.editingIdx].title}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({question: {title: title, category: category, level: level, tags: tags}}),
    })
      .then(res => {
        if (res.status === 201) {
          this.setState(state => {
            state.questionList[state.editingIdx] = {title: title, category: category, level: level, tags: tags};
            return {questionList: [...state.questionList]}});
        }
      })
      .catch(rej => console.log(rej));
  }

  deleteQuestion() {
    let idx = Number(document.forms['deleteQuestion']['title'].value);
    let title = this.state.questionList[idx].title;
    fetch(`${API_URL}/coding/questions/${title}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState(state => {
            state.questionList.splice(idx, 1);
            return {questionList: [...state.questionList], sure: false};
          })
        }
      })
      .catch(rej => console.log(rej));
  }


  render() {
    let filteredQuestionList = this.state.questionList
      .filter(each => (each.title.toLowerCase().includes(this.state.searchString.toLowerCase())))

    return (
      <div className='page-normal'>
        <NavBar/>
        <div className='page-normal-main'>
          <div className='questionboard-header'>
            <h2 className='questionboard-title'>
              Question Board {this.state.admin && this.renderAdmin()}
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
                    onChange={() => this.setState({sort: SORT_TYPE[each.id]})}>
                    {each.name}
                  </ToggleButton>
                ))
              }
            </div>
          </div>
          {this.renderPopup()}
          {this.sortQuestions(filteredQuestionList)}
        </div>
        <Footer/>
      </div>
    )
  }
}

export default QuestionBoard;