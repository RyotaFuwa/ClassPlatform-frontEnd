import React from "react";
import {connect} from 'react-redux';
import TimerBox from "../../components/TimerBox/TimerBox";
import AceEditor from "react-ace";
import CollapibleBlock from "../../components/CollapibleBlock/CollapibleBlock";
import {Tab, TabBlock} from "../../components/Tab/Tab";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import titlize from 'titlize';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-noconflict/keybinding-sublime";

import {Create, Delete, Update} from "../../icons";
import {AppPage, Header} from "../../components/Page/Page";
import "./CodingRoom.css";

const fetch = require('node-fetch');
const API_URL = 'http://localhost:3001/api';

const Instruction = props => {
  if (props.editing)
    return (<textarea className="h-100 w-100 pl-4 border-0 scrollable size-fixed" value={props.instruction} onChange={props.onChange}/>)
  else
    return (<pre className="h-100 w-100 pl-4 border-0 scrollable size-fixed" value={props.instruction}/>)
}

const Helps = props => {
  if (props.editing) {
    return (
      <div>
        <div className='mt-3'>
          <Create  onClick={props.onAdd}/>
          <Delete onClick={props.onDelete} />
        </div>

        <div className='codingroom-docs-tips'>
          {props.helps.map((helpTxt, idx) => (
            <div key={idx} className='w-100'>
              <div className='w-100 text-left'>Tip {idx + 1}</div>
              <textarea className='w-100 size-fixed' style={{height: '100px'}} value={helpTxt} onChange={e => props.onChange(idx, e)} />
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className='codingroom-docs-tips'>
        {props.helps.map((helpTxt, idx) => (
          <CollapibleBlock key={idx} title={`Tip ${idx + 1}`}><p>{helpTxt}</p></CollapibleBlock>
        ))}
      </div>
    )
  }
}

class CodingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: (props.match && props.match.params.question) ? titlize(props.match.params.question) : 'Coding Room',
      instruction: '',
      helps: [],
      tests: [],
      pseudo: '',

      theme: 'monokai',
      keybinding: 'sublime',
      text: '',
      output: {stdout: '', stderr: '', error: ''},

      timerType: 'stopwatch',
      controllable: true,
      durationMinute: 45,

      editing: this.props.currentUser && this.props.currentUser.admin,
    };
  }

  componentDidMount() {
    // get question by api call on url
    if (this.state.title !== '') {
      fetch(`${API_URL}/coding/questions/${this.state.title}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
        .then(res => res.json())
        .then(json => {
          this.setState(json);
        })
        .catch(rej => console.log(rej));
    }
  }

  saveQuestion() {
    fetch(`${API_URL}/coding/questions/${titlize(this.state.title)}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          question: {
            instruction: this.state.instruction,
            helps: this.state.helps,
            tests: this.state.tests,
            pseudo: this.state.pseudo,
          }
        }
      )
    })
      .then(res => console.log(res.status))
      .catch(rej => console.log(rej));
  }

  renderTitle() {
    let admin = (this.props.currentUser && this.props.currentUser.admin);
    return (
      <div className='title'>
        {this.state.title}
        {admin &&
          <span className='btn-group'>
            <Update disabled={this.state.title === 'Coding Room'} onClick={() => this.saveQuestion()}/>
          </span>
        }
      </div>
    )
  }

  renderTabs() {
    return (
      <Tab className='w-100 h-100'>
        <TabBlock tabName="Instruction">
          <Instruction instruction={this.state.instruction}
                       editing={this.state.editing}
                       onChange={e => this.setState({instruction: e.target.value})} />

        </TabBlock>
        <TabBlock tabName='Tips'>
          <Helps helps={this.state.helps}
                 editing={this.state.editing}
                 onAdd={() => this.setState(state => ({helps: [...state.helps, '']}))}
                 onDelete={() => this.setState(state => {state.helps.pop(); return {helps: [...state.helps]}})}
                 onChange={(idx, e) => this.setState(state => {state.helps[idx] = e.target.value; return {helps: state.helps};})} />
        </TabBlock>
        <TabBlock tabName='Pseudo'>
          <AceEditor showGutter={true}
                     highlightActiveLine={false}
                     cursorStart={-1}
                     name="coding-solution"
                     width="100%"
                     height="100%"
                     fontSize={14}
                     readOnly={!this.state.editing}
                     theme='github'
                     defaultValue={this.state.pseudo}
                     value={this.state.pseudo}
                     onChange={(e) => this.setState({pseudo: e})}/>
        </TabBlock>
        <TabBlock tabName='Memo'>
          <iframe className='border-0'
                  src="https://docs.google.com/document/d/1nzDH0jBdTicIS5gJZ2AFN82-vD7ojb4eDQjcFEcwl1A/edit?usp=sharing&rm=demo&hl=en"
                  title={'memo'}
                  frameBorder='none'
                  width="100%"
                  height="100%"/>
        </TabBlock>

      </Tab>
    )
  }

  render() {
    return (
      <AppPage>
        <div className='codingroom'>
          <Header left={this.renderTitle()}
                  right={<TimerBox timerType={this.state.timerType}
                                   durationMinute={this.state.durationMinute}
                                   controllable={this.state.controllable} />} />
          <div className='docs-editor'>
            {this.renderTabs()}
            <CodeEditor tests={this.state.tests} initialCode={''}/>
          </div>
        </div>
      </AppPage>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(CodingRoom);
