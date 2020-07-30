import titlize from 'titlize';
import React, {Component, useState} from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import QuestionList from '../../components/QuestionList/QuestionList';
import ToggleButton from 'react-bootstrap/ToggleButton';

import './CodingRoom.css';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Create, Delete, Update} from "../../icons";
import {Header, Page} from "../../components/Page/Page";
import Slider from "@material-ui/core/Slider";
import Select from "react-select";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {connect} from "react-redux";

//TODO: Edit Forms to Dialog

const nodeFetch = require('node-fetch');
const API_URL = 'http://localhost:3001/api';

const SORT_TYPE = ['CATEGORY', 'DIFFICULTY', 'ALL'];
const CATEGORY = [ 'Array', 'String', 'Heap', 'Linked List', 'Tree', 'Graph', 'Sorting', 'Dynamic Programming'];
const DIFFICULTY_LEVEL = [{level: 'Easy', value: 25}, {level: 'Intermediate', value: 50},
  {level: 'Hard', value: 75}, {level: 'Professional', value: Infinity}];


const EditControl = props => {
  return (
    <span className='btn-group'>
      <span className='m-1'>
        <Create onClick={() => props.handleClick(0)} />
      </span>
      <span className='m-1'>
        <Update onClick={() => props.handleClick(1)} />
      </span>
      <span className='m-1'>
        <Delete onClick={() => props.handleClick(2)} />
      </span>
    </span>
  )
}

const CreateQuestionDialog = props => {
    return (
      <Dialog open={props.open}>
        <form className='form' onSubmit={e => {e.preventDefault(); props.onSubmit()}}>
          <label>
            <div>Title</div>
            <input value={props.newQuestion.title} onChange={e => props.setTitle(e.target.value)} />
          </label>
          <label>
            <div>Category</div>
            <Select className="basic-single"
                    classNamePrefix="select"
                    isSearchable
                    name="category"
                    value={{label: props.newQuestion.category, value: props.newQuestion.category}}
                    options={[...CATEGORY, 'Misc'].map(each => ({label: each, value: each}))}
                    onChange={e => props.setCategory(e.label)} />
          </label>
          <label>
            <div>Level</div>
            <Slider style={{width: 200}}
                    aria-labelledby="label"
                    value={props.newQuestion.level}
                    valueLabelDisplay='auto'
                    onChange={(e, v) => props.setLevel(v)} />
          </label>
          <label>
            <div>Tags</div>
            <input placeholder='Comma Separated' value={props.newQuestion.tags} onChange={e => props.setTags(e.target.value)} />
          </label>
          <Button className='form-button' type="submit">
            Create
          </Button>
        </form>
      </Dialog>
    )
}

const EditQuestionDialog = props => {
  let questionList = props.questionList
    .map((each, idx) => ({label: each.title, value: idx}))
    .sort((a, b) => (a.label >= b.label));
  return (
    <Dialog open={props.open}>
      <form className='form' onSubmit={e => {e.preventDefault(); props.onSubmit()}}>
        <label>
        <div>Question to Edit</div>
          <Select className="basic-single"
                  classNamePrefix="select"
                  isClearable
                  isSearchable
                  name="quesiton"
                  options={questionList}
                  onChange={e => {if(e) {props.onSelect(e.value)}}} />
        </label>
        <label>
          <div>Title</div>
          <input value={props.editingQuestion.title} onChange={e => props.setTitle(e.target.value)} />
        </label>
        <label>
          <div>Category</div>
          <Select className="basic-single"
                  classNamePrefix="select"
                  isSearchable
                  name="category"
                  value={{label: props.editingQuestion.category, value: props.editingQuestion.category}}
                  options={[...CATEGORY, 'Misc'].map(each => ({label: each, value: each}))}
                  onChange={e => props.setCategory(e.label)} />
        </label>
        <label>
          <div>Level</div>
            <Slider style={{width: 200}}
                    value={props.editingQuestion.level}
                    valueLabelDisplay='auto'
                    onChange={(e, v) => props.setLevel(v)} />

        </label>
        <label>
          <div>Tags</div>
          <input value={props.editingQuestion.tags} placeholder='Comma Separated' onChange={e => props.setTags(e.target.value)} />
        </label>

        <Button className='form-button' type="submit">
          Edit
        </Button>
      </form>
    </Dialog>
  )
}

const DeleteQuestionDialog = props => {
  let [sure, setSure] = useState(false);
  let questionList = props.questionList
    .map((each, idx) => ({label: each.title, value: idx}))
    .sort((a, b) => (a.label >= b.label));
  return (
    <Dialog open={props.open} maxWidth='sm'>
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
          <Select className="basic-single"
                  classNamePrefix="select"
                  isClearable
                  isSearchable
                  name="quesiton"
                  options={questionList}
                  onChange={e => {if(e) {props.onSelect(e.value)}}} />
        </label>
        {!sure &&
          <Button className='form-button' onClick={() => setSure(true)}>
            Delete
          </Button>
        }
        {sure &&
          <span>
            <Button className='form-button m-1'  type="submit">
              Sure
            </Button>
            <Button className='form-button m-1' onClick={() => setSure(false)}>
              Nah
            </Button>
          </span>
        }
      </form>
    </Dialog>
  )
}

const CodingChallengeDialog = props => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant='outlined' className='m-1' onClick={() => setOpen(true)}> Coding Challange </Button>
      <Dialog fullWidth maxWidth='sm' open={open} fullWidth>
        <DialogTitle>Coding Challenge</DialogTitle>
        <DialogContent>
            <div className='m-5'>
              <TextField autoFocus margin="dense" label="Question Code" type="name" fullWidth/>
            </div>
            <div className='m-5'>
              <TextField autoFocus margin="none" label='Session Key' type="password" fullWidth/>
            </div>
        </DialogContent>

        <DialogActions>
          <Button className='btn-none' onClick={() => console.log('fetch question and go to coding room')}>
            Enter
          </Button>
          <Button className='btn-none' onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const GoToCodingRoom = () => (
  <Button variant='outlined'>
    <Link className='link' to='/codingroom'>
      Go to Coding Room
    </Link>
  </Button>
)

const SortPanel = props => (
  <div className='questionboard-sortpanel'>
    <ButtonGroup size='large' variant='text'>
    {SORT_TYPE.map((each, idx) => (
      <Button key={idx}
              disabled={props.sortIdx === idx}
              onClick={() => props.onChange(idx)}>
        {each}
      </Button>
    ))}
    </ButtonGroup>
  </div>
)



function categoricalSort(questions) {
  const categories = new Map(CATEGORY.map(each => [each, []]));
  categories.set('Misc', []);
  for (let idx = 0; idx < questions.length; idx++) {
    let question = questions[idx];
    let category = question.category ? question.category : 'Misc';
    category = categories.has(category) ? category : 'Misc';
    categories.get(category).push(question);
  }

  let sortedQuestionList = [];
  let compareInteger = (a, b) => (a.level >= b.level);
  categories.forEach((questionList, key) => {
    sortedQuestionList.push(
      <QuestionList  key={key} title={key} type='vertical'
                     questions={questionList.sort(compareInteger)} />)
  });
  return <div className='questionboard-vertical'>{sortedQuestionList}</div>;
}

function levelSort(questions) {
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
                             questions={each.list.sort((a, b) => (a.level >= b.level))} />
      })}
    </div>
  )
}

function randomSort(questions) {
  return (
    <div className='questionboard-horizontal'>
      <QuestionList type='horizontal' key={'All'} title='All' questions={questions} />
    </div>
  )
}

const QuestionBoard = ({questionList, sortIdx}) => {
  switch (sortIdx) {
    case 0:
      return categoricalSort(questionList);
      case 1:
        return levelSort(questionList);
      case 2:
        return randomSort(questionList);
      default:
        return <div />
  }
}

class CodingBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortIdx: 0,
      questionList: [],
      searchString: '',

      popup: null,
      challenge: false,

      //new question info
      idx: 0,
      title: '', level: 0, category: '', tags: '', //convert it into list on submit
    }
  }

  componentDidMount() {
    nodeFetch(`${API_URL}/coding/questions/info`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}})
      .then(res => res.json())
      .then(json => {
        this.setState({questionList: json.questions, sortIdx: 0})})
      .catch(rej => console.log(rej));
  }

  editDialogs()  {
        return (
          <>
          <CreateQuestionDialog open={this.state.popup === 0}
                                onSubmit={() => this.createQuestion()}
                                onClose={() => this.setState({popup: null})}
                                newQuestion={{ title: this.state.title, level: this.state.level, category: this.state.category, tags: this.state.tags}}
                                setTitle={title => this.setState({title: title})}
                                setLevel={level => this.setState({level: level})}
                                setCategory={category => this.setState({category: category})}
                                setTags={tags => this.setState({tags: tags})} />
          <EditQuestionDialog open={this.state.popup === 1}
                              questionList={this.state.questionList}
                              onClose={() => this.setState({popup: null})}
                              editingQuestion={{title: this.state.title, category: this.state.category, level: this.state.level, tags: this.state.tags}}
                              onSubmit={() => this.editQuestion()}
                              onSelect={idx => this.setState(state => ({idx: idx, ...state.questionList[idx], tags: state.questionList[idx].tags.join(',')}))}
                              setTitle={title => this.setState({title: title})}
                              setLevel={level => this.setState({level: level})}
                              etCategory={category => this.setState({category: category})}
                              setTags={tags => this.setState({tags: tags})} />
          <DeleteQuestionDialog open={this.state.popup === 1}
                                questionList={this.state.questionList}
                                onSubmit={() => this.deleteQuestion()}
                                onSelect={idx => this.setState({idx: idx})} />
          </>
        )
  }

  createQuestion() {
    let alreadyExist = this.state.questionList
      .filter(each => each.title === titlize(this.state.title)).length !== 0;
    if(alreadyExist)
      return; //Might be ask users to override it.

    let newQuestion = {title: titlize(this.state.title),
      category: this.state.category,
      level: this.state.level,
      tags: this.state.tags.split(',').map(each => each.replace(/^\s+|\s+$/g, '')),
    }
    nodeFetch(`${API_URL}/coding/questions/info`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({question: newQuestion}),
    })
      .then(res => {
        if (res.status === 201) {
          newQuestion.new = true;
          this.setState(state => ({ questionList: [...state.questionList, newQuestion]}));
        }
      })
      .catch(rej => console.log(rej));
  }

  editQuestion() {
    let newQuestion = {title: titlize(this.state.title),
      category: this.state.category,
      level: this.state.level,
      tags: this.state.tags.split(',').map(each => each.replace(/^\s+|\s+$/g, '')),
    }
    nodeFetch(`${API_URL}/coding/questions/info/${this.state.questionList[this.state.idx].title}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({question: newQuestion}),
    })
      .then(res => {
        if (res.status === 201) {
          this.setState(state => {
            state.questionList[state.idx] = newQuestion;
            return {questionList: [...state.questionList]}});
        }
      })
      .catch(rej => console.log(rej));
  }

  deleteQuestion() {
    let title = this.state.questionList[this.state.idx].title;
    nodeFetch(`${API_URL}/coding/questions/${title}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState(state => {
            state.questionList.splice(state.idx, 1);
            return {questionList: [...state.questionList], sure: false};
          })
        }
      })
      .catch(rej => console.log(rej));
  }

  render() {
    // filter out questions.
    // filtering is done after all data is imported locally, but it can be done assuming the amount
    // of data is relatively small. Once it gets large, the filtering procedure should be done on backend.
    let filteredQuestionList = this.state.questionList
      .filter(each => (each.title.toUpperCase().includes(this.state.searchString.toUpperCase())))
    let admin = (this.props.currentUser && this.props.currentUser.admin);
    return (
      <>
        <Page>
          <Header left={(
            <div className='title'>
              Coding Board
              {admin && <EditControl handleClick={idx => this.setState(state => ({popup: state.popup === null ? idx : null}))}/>}
            </div>
          )}
                  center={<SearchBox placeholder='Search Question'
                                     onChange={e => this.setState({searchString: e.target.value})}/>}
                  right={<div className='codingboard-right'><GoToCodingRoom /><CodingChallengeDialog /></div>} />
          <SortPanel sortIdx={this.state.sortIdx}
                     onChange={idx => this.setState({sortIdx: idx})} />
          <QuestionBoard questionList={filteredQuestionList} sortIdx={this.state.sortIdx} />
        </Page>
        {this.editDialogs()}
      </>
  )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(CodingBoard);