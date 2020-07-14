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
class ClassBoard extends Component {
  constructor(props) {
    super(props);

    //sample implementation
    let sampleClass = {
      title: "Coding Camp 2020",
      description: "Practice Coding & Algorithm Questions! xxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      theme: 'darkblue',
    };

    let sampleClass2 = {
      title: "Coding Camp 2021",
      description: "",
      theme: 'lightblue',
    };

    this.state = {
      searchSubstring: "",
      classList: [sampleClass, sampleClass2],
      editingIdx: null,
    }
  }

  createClass() {
    let title = document.forms['createClass']['title'].value;
    let theme = document.forms['createClass']['theme'].value;
    let desc = document.forms['createClass']['desc'].value;
    console.log([title, theme, desc]);
    let status = 200;
    if(status === 200) {
      let newClass = {title: title, description: desc, theme: theme};
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
                <div>Description</div>
                <textarea name='desc' placeholder='Description' />
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
    let theme = editingClass ? editingClass.theme : 'dimgray';
    let desc = editingClass ? editingClass.description : '';

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
              <div>Description</div>
              <textarea name='desc' defaultValue={desc} />
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
    let matchedClasses = this.getMatchedClasses();
    return (
      <div className="page-normal">
        <NavBar/>
        <div className="page-normal-main">
          <div className="classboard-header">
            <h2 className="classboard-title">
              Class Room &nbsp;
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
            <div className="classboard-searchbox">
              <SearchBox onChange={e => this.setState({searchSubstring: e.target.value})}/>
            </div>
          </div>
          <ClassList classList={matchedClasses}/>
        </div>
        <Footer/>
      </div>
    )
  }

  getMatchedClasses = () => {
    let pattern = this.state.searchSubstring.toLowerCase();
    let matchedClasses = this.state.classList.filter(each =>
      each.title.toLowerCase().includes(pattern));
    return matchedClasses;
  }
}

export default ClassBoard;


