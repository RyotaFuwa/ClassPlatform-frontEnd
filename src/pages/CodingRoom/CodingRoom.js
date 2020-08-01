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
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import SelectPopover from "../../components/SelectPopover/SelectPopover";

const Title = props => {
  return (
    <div className='title'>
      {props.name}
      {props.admin &&
      <span className='btn-group'>
            <Update
              disabled={props.name === 'Coding Room'}
              onClick={props.handleClick}
            />
          </span>
      }
    </div>
  )
}

const Console = props => {
  return (
    <div className="console">
      <span className='m-1'/>
      <SelectPopover
        options={['monokai', 'github', 'dawn'].map(each => ({label: each, value: each, disabled: false}))}
        value={props.theme}
        handleChange={e => props.handleChange({theme: e.target.value})}/>

      <span className='m-1'/>
      <SelectPopover
        options={['sublime', 'vim', 'emacs'].map(each => ({label: each, value: each, disabled: false}))}
        value={props.keybinding}
        handleChange={e => props.handleChange({keybinding: e.target.value})}/>

      <span className='m-1'/>
      <SelectPopover
        options={[
          {label: 'python', value: 'python', disabled: false},
          {label: 'javascript', value: 'javascript', disabled: true},
          {label: 'java', value: 'java', disabled: true},
          {label: 'C++', value: 'c_cpp', disabled: true},
        ]}
        value={props.lang}
        handleChange={e => props.handleChange({lang: e.target.value})}/>
    </div>
  )
}

const RunButton = props => {
  return (
    <Button
      className='run-button'
      fullWidth
      size='small'
      variant='contained'
      color="primary"
      onClick={props.onClick()}
      disabled={props.running}
    >
      Run
    </Button>
  )
}

const MainEditor = props => {
  return(
    <div className='main-editor'>
      {props.running && <LinearProgress/>}
      <AceEditor
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
        }}
        fontSize={14}
        width="100%"
        height="100%"
        placeholder=""

        mode={props.lang}
        theme={props.theme}
        keyboardHandler={props.keybinding}
        value={props.text}
        onChange={e => props.onChange(e.value.target)}
      />
    </div>
  )
}

const OutputBox = props => {
  const {stdout, stderr, error} = props.output;
  return (
    <pre
      className='output-box scrollable'
      style={{color: stdout ? 'floralwhite' : 'crimson'}}
    >
      {stdout || stderr + error}
    </pre>
  )
}

const Instruction = props => {
  if (props.editing)
    return (<textarea className="instruction" value={props.instruction} onChange={props.onChange}/>)
  else
    return (<pre className="h-100 w-100 pl-4 border-0 scrollable size-fixed" value={props.instruction}/>)
}

const Tips = props => {
  if (props.editing) {
    return (
      <div className='tips'>
        <div className='mt-3'>
          <Create  onClick={props.onAdd}/>
          <Delete onClick={props.onDelete} />
        </div>

        <div className='codingroom-docs-tips'>
          {props.tips.map((helpTxt, idx) => (
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
      <div className='tips'>
        {props.tips.map((helpTxt, idx) => (
          <CollapibleBlock key={idx} title={`Tip ${idx + 1}`}><p>{helpTxt}</p></CollapibleBlock>
        ))}
      </div>
    )
  }
}

const DocsTab = props => {
  return (
    <Tab className='docs-tab'>
      <TabBlock tabName="Instruction">
        <Instruction
          instruction={props.instruction}
          editing={props.editing}
          onChange={e => props.handleChange({instruction: e.target.value})}
        />
      </TabBlock>
      <TabBlock tabName='Tips'>
        <Tips
          tips={props.tips}
          editing={props.editing}
          onAdd={() => {
            props.tips.push('');
            props.onChange({tips: [...props.tips]})
          }}
          onDelete={() => {
            props.tips.pop();
            props.onChange({tips: [...props.tips]})
          }}
          onChange={(idx, e) => {
            props.tips[idx] = e.target.value;
            props.onChange({tips: [...props.tips]})
          }}
        />
      </TabBlock>
      <TabBlock tabName='Pseudo'>
        <AceEditor
          showGutter={true}
          highlightActiveLine={false}
          cursorStart={-1}
          name="coding-solution"
          width="100%"
          height="100%"
          fontSize={14}
          readOnly={!props.editing}
          theme='github'
          value={props.pseudo}
          onChange={(e) => props.handleChange({pseudo: e})}
        />
      </TabBlock>
      <TabBlock tabName='Memo'>
        <iframe
          src="https://docs.google.com/document/d/1nzDH0jBdTicIS5gJZ2AFN82-vD7ojb4eDQjcFEcwl1A/edit?usp=sharing&rm=demo&hl=en"
          title={'memo'}
          frameBorder='none'
          width="100%"
          height="100%"
        />
      </TabBlock>
    </Tab>
  )
}


class CodingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: (props.match && props.match.params.question) ? titlize(props.match.params.question) : 'Coding Room',
      instruction: '',
      tips: [],
      tests: [],
      pseudo: '',
      initialText: '',

      lang: "python",
      theme: 'monokai',
      keybinding: 'sublime',
      output: {stdout: '', stderr: '', error: ''},

      timerType: 'stopwatch',
      controllable: true,
      durationMinute: 45,

      running: false,
      // editing: this.props.currentUser && this.props.currentUser.admin,
    };
  }

  async componentDidMount() {
    //firestore
  }

  async runCode() {
    this.setState({running: true});
    /*
    try {
      const output = await run(this.state.text, this.state.lang)
      this.setState({output: output, running: false});
    } catch(err) {
      this.setState({output: {stdout: '', stderr: '', error: 'Failed to Run'}, running: false});
    }
    */
  }

  async updateQuestion() {
    try {
      //get questionContents
    }
    catch(err) {
      alert("Failed to Update Contents.")
    }
  }

  handleChange(updatingFields) {
    this.setState(updatingFields);
  }

  // DogTabs
  addTips() {
    this.setState(state => ({tips: [...state.tips, '']}))
  }

  deleteTips() {
    this.setState(state => {state.tips.pop(); return {tips: [...state.tips]}})
  }

  handleChangeTips(idx, e) {
    this.setState(state => {
      state.tips[idx] = e.target.value;
      return {tips: state.tips};
    })
  }

  render() {
    let admin = (this.props.currentUser && this.props.currentUser.admin);
    return (
      <AppPage>
        <Header
          left={(
            <Title
            name={this.state.name}
            admin={admin}
            handleClick={() => this.updateQuestion()}
            />
          )}
          right={(
            <TimerBox
              timerType={this.state.timerType}
              durationMinute={this.state.durationMinute}
              controllable={this.state.controllable}
            />
          )}
        />
        <div className='codingroom'>
          <Console
            theme={this.state.theme}
            keybinding={this.state.keybinding}
            lang={this.state.lang}
            handleChange={this.handleChange}
          />
          <RunButton
            running={this.state.running}
            onClick={() => this.runCode()}
          />
          <MainEditor
            text={this.state.text}
            theme={this.state.theme}
            keybinding={this.state.keybinding}
            lang={this.state.lang}
            onChange={e => this.setState({text: e.target.value})}
          />
          <DocsTab
            instruction={this.state.instruction}
            tips={this.state.tips}
            pseudo={this.state.pseudo}
            editing={admin}
            handleChange={this.handleChange}
          />



        </div>
      </AppPage>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(CodingRoom);
