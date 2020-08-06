import React from "react";
import {connect} from 'react-redux';
import TimerBox from "../../components/TimerBox/TimerBox";
import {Tab, TabBlock} from "../../components/Tab/Tab";
import titlize from 'titlize';

import AceEditor from "react-ace";
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

import { Update} from "../../icons";
import {AppPage, Header} from "../../components/Page/Page";
import "./CodingRoom.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import SelectPopover from "../../components/SelectPopover/SelectPopover";
import Tips from "../../components/Tips/Tips";

import {
  getCodingQuestionByName, getContent, updateContent,
} from "../../firebase/firebase.firestore.codingQuestions";

import {setCurrentCodingQuestion} from "../../redux/coding/coding.actions";

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
        color='primary'
        value={props.theme}
        handleChange={e => props.handleChange({theme: e.target.value})}
      />
      <span className='m-1'/>
      <SelectPopover
        options={['sublime', 'vim', 'emacs'].map(each => ({label: each, value: each, disabled: false}))}
        color='primary'
        value={props.keybinding}
        handleChange={e => props.handleChange({keybinding: e.target.value})}
      />
      <span className='m-1'/>
      <SelectPopover
        color='primary'
        options={[
          {label: 'python', value: 'python', disabled: false},
          {label: 'javascript', value: 'javascript', disabled: true},
          {label: 'java', value: 'java', disabled: true},
          {label: 'C++', value: 'c_cpp', disabled: true},
        ]}
        value={props.lang}
        handleChange={e => props.handleChange({lang: e.target.value})}
      />
      {props.admin &&
        <>
          <span className='m-1'/>
          <SelectPopover
          color='secondary'
          options={[
            {label: 'Initial Text', value: 'text'},
            {label: 'Solution', value: 'solution'},
          ]}
          value={props.editorMode}
          handleChange={e => props.handleChange({editorMode: e.target.value})}
          />
          <span className='m-1'/>
          <SelectPopover
            color='secondary'
            options={[
              {label: 'Tests', value: 'tests'},
            ]}
            value='tests' //now its not working
          />
        </>
      }
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
      onClick={props.onClick}
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
        onChange={txt => props.onChange(txt)}
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
    return (<textarea className="instruction scrollable size-fixed" value={props.instruction} onChange={props.onChange}/>)
  else
    return (<pre className="instruction scrollable size-fixed">{props.instruction}</pre>)
}

const DocsTab = props => {
  return (
    <div className='docs-tab'>
    <Tab>
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
            props.handleChange({tips: [...props.tips]})
          }}
          onDelete={() => {
            props.tips.pop();
            props.handleChange({tips: [...props.tips]})
          }}
          onChange={(idx, e) => {
            props.tips[idx] = e.target.value;
            props.handleChange({tips: [...props.tips]})
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
    </div>
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
      text: '',
      solution: ' ',

      lang: "python",
      theme: 'monokai',
      keybinding: 'sublime',
      output: {stdout: '', stderr: '', error: ''},

      timerType: 'stopwatch',
      controllable: true,
      durationMinute: 45,

      running: false,
      editorMode: 'text'
      // editing: this.props.currentUser && this.props.currentUser.admin,
    };
  }

  async componentDidMount() {
    //firestore
    let hasValidQuestionName = this.props.match && this.props.match.params.question
    if(hasValidQuestionName) {
      try {
        let questionNotSet = this.props.currentCodingQuestion === null;

        //codingQuestion should always be set if the user comes to this page from clicking a QuestionCard.
        //now requesting contents by typing url directly is disabled so this if block is not supposed to be run.
        if(questionNotSet) {
          const codingQuestion = await getCodingQuestionByName(this.props.match.params.question);
          await this.props.setCurrentCodingQuestion(codingQuestion);
        }

        const documentSnapshot = await getContent(this.props.currentCodingQuestion.contentId);
        this.setState(documentSnapshot.data());
      }
      catch (err) {
        alert("Failed to load the question.");
        console.log(err);
      }
    }
  }

  componentWillUnmount() {
    this.props.setCurrentCodingQuestion(null);
  }

  async runCode() {
    // this.setState({running: true});
    /*
    try {
      const output = await run(this.state.lang, this.state.text)
      this.setState({output: output, running: false});
    } catch(err) {
      this.setState({output: {stdout: '', stderr: '', error: 'Failed to Run'}, running: false});
    }
    */
  }

  async updateContent() {
    const updatingFields = (({instruction, tips, tests, pseudo, text, solution}) =>
      ({instruction, tips, tests, pseudo, text, solution}))(this.state);
    try {
      await updateContent(this.props.currentCodingQuestion.contentId, updatingFields);
    }
    catch(err) {
      console.log(err)
      alert("Failed to Update Contents.")
    }
  }

  handleChange(updatingFields) {
    this.setState(updatingFields);
  }

  render() {
    const admin = (this.props.currentUser && this.props.currentUser.admin);
    let code = this.state.text;
    if(this.state.editorMode === 'solution') {
      code = this.state.solution;
    }
    return (
      <AppPage>
        <div className='coding-room'>
          <Header
            left={(
              <Title
                name={this.state.name}
                admin={admin}
                handleClick={() => this.updateContent()}
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
          <Console
            admin={admin}
            theme={this.state.theme}
            keybinding={this.state.keybinding}
            lang={this.state.lang}
            editorMode={this.state.editorMode}
            handleChange={updatingFields => this.handleChange(updatingFields)}
          />
          <RunButton
            running={this.state.running}
            onClick={() => this.runCode()}
          />
          <MainEditor
            text={code}
            theme={this.state.theme}
            keybinding={this.state.keybinding}
            lang={this.state.lang}
            onChange={txt => this.setState({[this.state.editorMode]: txt})}
          />
          <OutputBox output={this.state.output} />
          <DocsTab
            instruction={this.state.instruction}
            tips={this.state.tips}
            pseudo={this.state.pseudo}
            editing={admin}
            handleChange={updatingFields => this.handleChange(updatingFields)}
          />
        </div>
      </AppPage>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentCodingQuestion: state.coding.currentCodingQuestion,
})

const mapDispatchToProps = dispatch => ({
  setCurrentCodingQuestion: question => dispatch(setCurrentCodingQuestion(question)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CodingRoom);
