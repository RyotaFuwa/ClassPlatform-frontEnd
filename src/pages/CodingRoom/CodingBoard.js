import titlize from 'titlize';
import React, {Component, useState} from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import QuestionList from '../../components/QuestionList/QuestionList';

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
import {
  createCodingQuestion,
  getAllCodingQuestions,
  updateCodingQuestion
} from "../../firebase/firebase.firestore.codingQuestions";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

//TODO: Edit Forms to Dialog

const nodeFetch = require('node-fetch');
const API_URL = 'http://localhost:3001/api';

const SORT_TYPE = ['CATEGORY', 'DIFFICULTY', 'ALL'];
const CATEGORY = [ 'Array', 'String', 'Heap', 'Linked List', 'Tree', 'Graph', 'Sorting', 'Dynamic Programming', 'Misc'];
const DIFFICULTY = [{label: 'Easy', value: 25}, {label: 'Intermediate', value: 50},
  {label: 'Hard', value: 75}, {label: 'Professional', value: Infinity}];


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
  const {name, difficulty, category, tags} = props.editingQuestion;
    return (
      <Dialog fullWidth maxWidth='sm' open={props.open}>
        <DialogTitle>Create a New Question</DialogTitle>
        <DialogContent>
          <div className='mb-5'>
            <TextField
              label='Name'
              value={name}
              onChange={e => props.onChange({name: e.target.value})}
              fullWidth
            />
          </div>
          <div className='mb-5'>
            <TextField
              label="Category"
              value={category}
              onChange={e => props.onChange({category: e.target.value})}
              select
              fullWidth
            >
              {
                CATEGORY.map(each => (
                  <MenuItem key={each} value={each}>
                    {each}
                  </MenuItem>
                ))
              }
            </TextField>
          </div>
          <div className='mb-5'>
            <Typography id="continuous-slider" gutterBottom>
              Difficulty
            </Typography>
            <Slider
              value={difficulty}
              valueLabelDisplay='auto'
              onChange={(e, v) => props.onChange({difficulty: v})}
            />
          </div>
          <div className='mb-5'>
            <TextField
              label='Tags'
              placeholder='Comma Separated'
              value={tags}
              onChange={e => props.onChange({tags: e.target.value})}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onSubmit}> Create </Button>
          <Button onClick={props.onClose}> Cancel </Button>
        </DialogActions>
      </Dialog>
    )
}

const EditQuestionDialog = props => {
  let questionList = props.questionList
    .map((each, idx) => ({label: each.name, value: idx}))
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
          <input value={props.editingQuestion.name} onChange={e => props.setTitle(e.target.value)} />
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
                    value={props.editingQuestion.difficulty}
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
    .map((each, idx) => ({label: each.name, value: idx}))
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

const GoToCodingRoom  = () => (
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
      <Button
        key={idx}
        disabled={props.sortIdx === idx}
        onClick={() => props.onChange(idx)}
      >
        {each}
      </Button>
    ))}
    </ButtonGroup>
  </div>
)


//sorting questions
function categoricalSort(questions) {
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

function levelSort(questions) {
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

function randomSort(questions) {
  return (
    <div className='questionboard-horizontal'>
      <QuestionList type='horizontal' key={'All'} name='All' questions={questions} />
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

      //editing question info
      selectedIdx: 0,
      name: '',
      difficulty: 0,
      category: '',
      tags: '',
    }
  }

  async componentDidMount() {
    //firestore
    try {
      const querySnapshot = await getAllCodingQuestions();
      let questionList = querySnapshot.docs.map(doc => ({...doc.data(), questionId: doc.id}));
      if (!this.props.currentUser.admin) {
        questionList = questionList.filter(question => question.active);
      }
      this.setState({questionList: questionList});
    }
    catch(err) {
      alert("Failed to load coding quesitons");
    }
  }

  handleSelect(idx) {
    const selectedQuestion = this.state.questionList[idx];
    const { name, difficulty, category, tags } = selectedQuestion;
    this.setState({
      name: name,
      difficulty: difficulty,
      category: category,
      tags: tags,
    })
  }

  editDialogs()  {
    const {questionList, name, difficulty, category, tags, popup, selectedIdx} = this.state;
    const editingQuestion = {name, difficulty, category, tags};
    return (
      <>
        <CreateQuestionDialog
          open={popup === 0}
          editingQuestion={editingQuestion}
          onChange={updateFields => this.setState(updateFields)}
          onSubmit={() => this.createQuestion()}
          onClose={() => this.setState({popup: null})}
        />
        <EditQuestionDialog
          open={popup === 1}
          questionList={questionList}
          selectedIdx={selectedIdx}
          editingQuestion={editingQuestion}
          onSelect={idx => this.handleSelect(idx)}
          onChange={updateFields => this.setState(updateFields)}
          onSubmit={() => this.editQuestion()}
          onClose={() => this.setState({popup: null, selectedIdx: null, name: '', difficulty: 0, category: '', tags: ''})}
        />
        <DeleteQuestionDialog
          open={this.state.popup === 1}
          questionList={this.state.questionList}
          selectedIdx={selectedIdx}
          onSelect={idx => this.setState({selectedIdx: idx})}
          onSubmit={() => this.deleteQuestion()}
          onClose={() => this.setState({popup: null, selectedIdx: null})}
        />
      </>
    )
  }

  async createQuestion() {
    const {name, difficulty, category, tags} = this.state;
    const titlizedName = titlize(name);
    let alreadyExist = this.state.questionList
      .filter(each => each.name === titlizedName).length !== 0;
    if(alreadyExist) {
      alert('A question with the same name already exists')
      return; //Might be ask users to override it.
    }

    const newQuestion = {
      name: titlizedName,
      category: category,
      difficulty: difficulty,
      tags: tags,
      active: true,
      createdAt: new Date(),
    }

    //firestore
    try {
      const documentRef = await createCodingQuestion(newQuestion);
      this.setState(state => ({
        quesitonList: [...state.questionList, {...newQuestion, questionId: documentRef.id}],
        name: '',
        difficulty: 0,
        category: '',
        tags: '',
        popup: null,
      }))
    }
    catch(err) {
      alert(`Failed to create a new question: ${err}`);
    }
  }

  async editQuestion() {
    const { questionId } = this.state.classList[this.state.selectedIdx];
    const {name, difficulty, category, tags} = this.state;
    const titlizedName = titlize(name);
    const updatingFields = {
      name: titlizedName,
      difficulty: difficulty,
      category: category,
      tags: tags,
    }

    //firestore
    try {
      await updateCodingQuestion(questionId, updatingFields);
      this.setState(state => {
        Object.assign(state.questionList[state.selectedIdx], updatingFields);
        return {
          questionList: [...state.questionList],
          name: '',
          difficulty: 0,
          category: '',
          tags: '',
          selectedIdx: null,
          popup: null,
        };
      })
    }
    catch(err) {
      alert(`Failed to update a question: ${err}`);
    }
  }

  async deleteQuestion() {
    //firebase
    // this function doesn't delete questions. what it actually does is to make a question inactive.
    const { questionId } = this.state.questionList[this.state.selectedIdx];
    try {
      await updateCodingQuestion(questionId, {active: false});
      this.setState(state => {
        Object.assign(state.questionList[state.selectedIdx], {active: false});
        return {questionList: [...state.questionList]}
      })
    }
    catch(err) {
      alert('Failed to delete(inactivate) the question');
    }

  }

  render() {
    // filter out questions.
    // filtering is done after all data is imported locally, but it can be done assuming the amount
    // of data is relatively small. Once it gets large, the filtering procedure should be done on backend.
    let admin = (this.props.currentUser && this.props.currentUser.admin);
    let filteredQuestionList = this.state.questionList
      .filter(each => (each.name.toUpperCase().includes(this.state.searchString.toUpperCase())))
    if(!admin) {
      filteredQuestionList = filteredQuestionList.filter(each => each.active);
    }

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