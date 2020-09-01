import titlize from 'titlize';
import React, {Component} from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import QuestionList from '../../components/QuestionList/QuestionList';

import '../CodingRoom/CodingRoom.css';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Create, Delete, Update} from "../../icons";
import {Header, Page} from "../../components/Page/Page";
import {connect} from "react-redux";
import {
  createCodingQuestion, deleteCodingQuestion,
  getAllCodingQuestions,
  updateCodingQuestion
} from "../../firebase/firebase.firestore.codingQuestions";
import {Dialogs, GoToButton} from "../../components/Primitives/Primitives";
import {CreateQuestionDialog} from "./components/Dialogs/CreateQuestionDialog";
import {EditQuestionDialog} from "./components/Dialogs/EditQuestionDialog";
import {DeleteQuestionDialog} from "./components/Dialogs/DeleteQuestionDialog";
import {CodingChallengeDialog} from "../ClassBoard/components/Dialogs/CodingChallengeDialog";
import {CATEGORY, DIFFICULTY, SORT_TYPE} from "./consts";
import './CodingBoard.css';
import {categoricalSort, difficultySort, randomSort} from "./funcitons";


//TODO: tabs (instruciton, pesudo and everything) deployed with editor.js might be better


const DialogManager = props => {
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


const SortPanel = props => {
  return (
    <div className='sort-panel'>
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
}


//sorting questions

const QuestionBoard = ({questionList, sortIdx}) => {
  switch (sortIdx) {
    case 0:
      return categoricalSort(questionList);
      case 1:
        return difficultySort(questionList);
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

      dialog: null,
      challenge: false,

      //editing question info
      selectedIdx: null,
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
    const { name, difficulty, category, tags } = this.state.questionList[idx];
    this.setState({
      selectedIdx: idx,
      name: name,
      difficulty: difficulty,
      category: category,
      tags: tags,
    })
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
      createdAt: new Date(),
    }

    //firestore
    try {
      const [questionRef, contentRef] = await createCodingQuestion(newQuestion);
      this.setState(state => ({
        questionList: [...state.questionList, {...newQuestion, active: true, outStanding: true, contentId: contentRef.id}], //
        name: '',
        difficulty: 0,
        category: '',
        tags: '',
        dialog: null,
      }))
    }
    catch(err) {
      alert(`Failed to create a new question: ${err}`);
    }
  }

  async editQuestion() {
    const { questionId } = this.state.questionList[this.state.selectedIdx];
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
        Object.assign(state.questionList[state.selectedIdx], {...updatingFields, outStanding: true});
        return {
          questionList: [...state.questionList],
          name: '',
          difficulty: 0,
          category: '',
          tags: '',
          selectedIdx: null,
          dialog: null,
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
    const { questionId, active } = this.state.questionList[this.state.selectedIdx];
    if(active) {
      try {
        await updateCodingQuestion(questionId, {active: false});
        this.setState(state => {
          Object.assign(state.questionList[state.selectedIdx], {active: false});
          return {
            questionList: [...state.questionList],
            selectedIdx: null,
            dialog: null,
          }
        })
      } catch (err) {
        alert('Failed to delete(inactivate) the question');
        console.log(err);
      }
    }
    else {
      try {
        await deleteCodingQuestion(questionId);
        this.setState(state => {
          state.questionList.splice(state.selectedIdx, 1);
          return {
            questionList: [...state.questionList],
            selectedIdx: null,
            dialog: null,
          }
        });
      } catch(err) {
        console.log(err);
        alert('Failed to hard-delete the question');
      }
    }
  }

  render() {
    // filter out questions.
    // filtering is done after all data is imported locally, but it can be done assuming the amount
    // of data is relatively small. Once it gets large, the filtering procedure should be done on backend.
    let {dialog, questionList, selectedIdx, name, difficulty, category, tags} = this.state;
    const editingQuestion = {name, difficulty, category, tags};
    let admin = (this.props.currentUser && this.props.currentUser.admin);
    let filteredQuestionList = this.state.questionList
      .filter(each => (each.name.toUpperCase().includes(this.state.searchString.toUpperCase())))
    if(!admin) {
      filteredQuestionList = filteredQuestionList.filter(each => each.active);
    }
    return (
      <>
        <Page>
          <Header
            left={
              <div className='title'>
                Coding Board
                {admin &&
                  <DialogManager
                    handleClick={idx => this.setState(state => ({dialog: state.dialog === null ? idx : null}))}
                  />
                }
              </div>
            }
            center={
              <SearchBox
                placeholder='Search Question'
                onChange={e => this.setState({searchString: e.target.value})}
              />
            }
            right={
              <div className='codingboard-right' >
                <GoToButton to='/codingroom'>
                  Go To Coding Room
                </GoToButton>
                <Button variant='outlined' className='m-1' onClick={() => this.setState({dialog: 4})}> Coding Challenge </Button>
              </div>
            }
          />
          <SortPanel
            sortIdx={this.state.sortIdx}
            onChange={idx => this.setState({sortIdx: idx})}
          />
          <QuestionBoard
            questionList={filteredQuestionList}
            sortIdx={this.state.sortIdx}
          />
        </Page>

        <Dialogs>
          <CreateQuestionDialog
            open={dialog === 0}
            editingQuestion={editingQuestion}
            onChange={updateFields => this.setState(updateFields)}
            onSubmit={() => this.createQuestion()}
            onClose={() => this.setState({dialog: null})}
          />
          <EditQuestionDialog
            open={dialog === 1}
            questionList={questionList}
            selectedIdx={selectedIdx}
            editingQuestion={editingQuestion}
            onSelect={idx => this.handleSelect(idx)}
            onChange={updateFields => this.setState(updateFields)}
            onSubmit={() => this.editQuestion()}
            onClose={() => this.setState({dialog: null, selectedIdx: null, name: '', difficulty: 0, category: '', tags: ''})}
          />
          <DeleteQuestionDialog
            open={this.state.dialog === 2}
            questionList={this.state.questionList}
            selectedIdx={selectedIdx}
            onSelect={idx => this.setState({selectedIdx: idx})}
            onSubmit={() => this.deleteQuestion()}
            onClose={() => this.setState({dialog: null, selectedIdx: null})}
          />
          <CodingChallengeDialog
            open={this.state.dialog === 4}
            onClose={() => this.setState({dialog: null})}
          />
        </Dialogs>
      </>
  )
  }
}


const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(CodingBoard);