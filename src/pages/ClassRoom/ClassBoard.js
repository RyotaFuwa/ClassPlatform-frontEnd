import React, {Component} from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import ClassList from "../../components/ClassList/ClassList";
import SearchBox from "../../components/SearchBox/SearchBox";
import "./ClassRoom.css";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const API_URL = 'http://localhost:3001/api';

const CreateClassForm = props => {}
const EditClassForm = props => {
  let editingClass = props.classList[props.editingIdx];
  return (
    <form className='form' onSubmit={e => {e.preventDefault(); props.onSubmit()}}>
      <label>
        <div>Class to Edit</div>
        <select value={props.editingIdx} onChange={(e) => props.setIdx(e.target.value)}>
          {props.classList
            .map((each, idx) => <option key={idx} value={idx} title={each.title}>{each.title}</option>)
            .sort((a, b) => (a.props.title >= b.props.title))
          }
        </select>
      </label>
      <label>
        <div>Title</div>
        <input value={editingClass.title} onChange={e => props.setTitle(e.target.value)} />
      </label>
      <label>
        <div>Tags</div>
        <input value={editingClass.tags.join(', ')} placeholder='Comma Separated' onChange={e => props.setTags(e.target.value)} />
      </label>
      <Button className='form-button' variant="success" type="submit">
        Edit
      </Button>
    </form>
  )
}
const DeleteClassForm = props => {}

class ClassBoard extends Component {
  constructor(props) {
    super(props);

    //sample implementation
    let sampleClass = {
      title: "Coding Camp 2020",
      theme: 'darkblue',
      tags: ['Algorithm', 'Introductory', 'Programming Language', 'Python', 'C++', 'JavaScript', 'Java'],
      // info: {level: 'Introduction', duration: '10 Days', prerequisites: ['an elementary skill in programming'], willLearn: ['Algorithm']},
    };

    let sampleClass3 = {
      title: "Thermo",
      theme: 'darkblue',
      tags: ['Algorithm', 'Introductory', 'Programming Language'],
      // info: {level: 'Introduction', duration: '10 Days', prerequisites: ['an elementary skill in programming'], willLearn: ['Algorithm']},
    };

    let sampleClass2 = {
      title: "Coding Camp 2021",
      theme: 'lightblue',
      tags: [],
      //info: "",
    };

    this.state = {
      searchSubstring: "",
      classList: [sampleClass, sampleClass2, sampleClass3],

      //new class info
      idx: 0,
      title: '',
      theme: '',
      tags: '',

      popup: null,
      admin: true,
    }
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
        return <CreateClassForm  onSubmit={() => this.createClass()}
                                 setTitle={title => this.setTitle({title: title})}
                                 setTheme={level => this.theme({level: level})}
                                 setTags={tags => this.setState({tags: tags})} />
      case ">":
        if(this.state.classList.length > 0) {
          return <EditClassForm classList={this.state.classList}
                                onSubmit={() => this.editClass()}
                                setIdx={idx => this.setState({idx: idx})}
                                setTitle={title => this.setState({title: title})}
                                editingIdx={this.state.idx}/>
        }
        else {
          return <div>
            No Question Found
            <Button className='m-2 btn-sm btn-secondary' onClick={() => this.setState({popup: null})}>Close</Button>
          </div>
        }
      case "-":
        if(this.state.classList.length) {
          return <DeleteClassForm classList={this.state.classList}
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

  createClass() {
    let title = document.forms['createClass']['title'].value;
    let theme = document.forms['createClass']['theme'].value;
    let info = document.forms['createClass']['info'].value;
    console.log([title, theme, info]);
    let status = 200;
    if(status === 200) {
      let newClass = {title: title, info: info, theme: theme};
      this.setState(state => ({classList: [...state.classList, newClass]}))
    }
  }

  editClass() {
    console.log('h')
  }

  deleteClass() {
    let idx = document.forms['deleteClass']['title'].value;
    let title = this.state.classList[idx].props.title;
    fetch(`${API_URL}/classes/${title}`, {
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
      return (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Create a New Class</Popover.Title>
          <Popover.Content>
            <form className='form' name='createClass'>
              <div>
                <div>Class Title</div>
                <input name='title' placeholder="Class Title"/>
              </div>
              <div>
                <div>Theme</div>
                <input name='theme' placeholder="Class Theme"/>
              </div>
              <div>
                <div>Info</div>
                <textarea name='info' placeholder='Description' />
              </div>
              <Button className='form-button' variant="primary" onClick={() => this.createClass()}> Create </Button>
            </form>
          </Popover.Content>
        </Popover>
      );
  }

  popOverEdit() {
    let editingClass = this.state.classList[this.state.editingIdx];
    let title = editingClass ? editingClass.title : '';
    let theme = editingClass ? editingClass.theme : '';
    let info = editingClass ? editingClass.info : {};

    return (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Edit a Class</Popover.Title>
        <Popover.Content>
          <form className='form' name='editClass'>
            <div>
              <div>Class To Edit</div>
              <select name='titleList' onChange={() => {
                let idx = document.forms['editClass']['titleList'].value;
                this.setState({editingIdx: idx});
              }}>
                <option selected> </option>
                {this.state.classList.map((each, idx) =>
                    <option key={idx} value={idx} title={each.title}>{each.title}</option>)
                  .sort((a, b) => (a.props.title >= b.props.title))
                }
              </select>
            </div>
            <div>
              <div>Class Title</div>
              <input name='title' defaultValue={title} placeholder='Not Selected'/>
            </div>
            <div>
              <div>Theme</div>
              <input name='theme' defaultValue={theme} />
            </div>
            <div>
              <div>Info</div>
              <textarea name='info' defaultValue={info} />
            </div>

            <Button className='form-button' variant="success" onClick={() => this.editClass()}>
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
        <Popover.Title as="h3">Delete a Class</Popover.Title>
        <Popover.Content>
          <form className='form' name='deleteClass'>
            <div>
              <div>Class To Delete</div>
              <select name='title'>
                {this.state.classList.map((each, idx) => (
                  <option key={idx} value={idx} title={each.title}>{each.title}</option>)
                ).sort((a, b) => (a.title >= b.title))}
              </select>
            </div>
            <Button className='form-button' variant="danger" onClick={() => this.deleteClass()}>
              Delete
            </Button>
          </form>
        </Popover.Content>
      </Popover>
    );
  }

  render() {
    let matchedClasses = this.state.classList.filter(each =>
      each.title.toLowerCase().includes(this.state.searchSubstring.toLowerCase()));
    return (
      <div className="page-normal">
        <NavBar/>
        <div className="page-normal-main">
          <div className="classboard-header">
            <h2 className="classboard-title">
              Class Room {this.state.admin && this.renderAdmin()}
            </h2>
            <div className="classboard-searchbox">
              <SearchBox onChange={e => this.setState({searchSubstring: e.target.value})}/>
            </div>
          </div>
          {this.renderPopup()}
          <ClassList classList={matchedClasses}/>
        </div>
        <Footer/>
      </div>
    )
  }

}

export default ClassBoard;


