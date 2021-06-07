import React from "react";
import {connect} from 'react-redux';
import CollapibleBlock from "../../components/CollapibleBlock/CollapibleBlock";
import {BackToTopButton} from "../../components/Primitives/Primitives";
import styled from "styled-components";
import TimerBox from "../../components/TimerBox/TimerBox";
import * as Icon from "react-bootstrap-icons";

import {Page} from "../../components/Page/Page";
import "./CodingRoom.css";

import {
  getCodingQuestionByName, getContent, updateContent,
} from "../../firebase/firebase.firestore.codingQuestions";

import {mapDispatchToProps, mapStateToProps} from "./consts";
import Console from "./components/Console/Console";
import {RunButton, SubmitButton} from "./components/Primitives/RunButton";
import OutputBox from "./components/Primitives/OutputBox";
import {CleanDocViewer} from "../../components/CleanDocViewer/CleanDocViewer";
import LinearProgress from "@material-ui/core/LinearProgress";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-noconflict/keybinding-sublime";

//TODO: use redux-session to hold question text.

const DEFAULT_EDITOR_THEME = 'monokai';
const DEFAULT_KEYBINDING = 'sublime';
const DEFAULT_LANG = 'python';

const OuterBox = styled.div`
  text-align: right;
  margin: 5em 0;
  z-index: 9999;
`

class CodingRoom extends React.Component {
  constructor(props) {
    super(props);
    const {editorTheme, keybinding, lang} = this.props.currentUser;
    this.state = {
      questionName: (props.match && props.match.params.question) ? props.match.params.question : 'Coding Room',
      instruction: '',
      tips: [],
      tests: [],
      pseudo: '',
      text: '',
      solution: ' ',

      editorTheme: editorTheme ? editorTheme : DEFAULT_EDITOR_THEME,
      keybinding: keybinding ? keybinding : DEFAULT_KEYBINDING,
      lang: lang ? lang : DEFAULT_LANG,

      output: {stdout: '', stderr: '', error: ''},

      timerType: 'stopwatch',
      controllable: true,
      durationMinute: 45,

      sidebarClosed: false,
      running: false,
    };

    this.sidebarRef = React.createRef();
  }

  async componentDidMount() {
    //firestore
    let wrongQuestion = this.state.questionName !== 'Coding Room' &&
      (this.state.questionName !== this.props.currentCodingQuestion.name)
    if(wrongQuestion) {
      try {
        //codingQuestion should always be set if the user comes to this page from clicking a QuestionCard.
        //now requesting contents by typing url directly is disabled so this if block is not supposed to be run.
        const codingQuestion = await getCodingQuestionByName(this.props.match.params.question);
        await this.props.setCurrentCodingQuestion(codingQuestion);
      }
      catch (err) {
        alert("Failed to load the question.");
        console.log(err);
      }
    }
    if(this.props.currentCodingQuestion) {
      const documentSnapshot = await getContent(this.props.currentCodingQuestion.contentId);
      this.setState(documentSnapshot.data());
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.running) {
      // currently not available.
      /*
      try {
        const output = await run(this.state.lang, this.state.text)
        this.setState({output: output, running: false});
      } catch(err) {
        this.setState({output: {stdout: '', stderr: '', error: 'Failed to Run'}, running: false});
      }
      */
    }
  }

  async runCode() {
    const {currentUser} = this.props;
    this.setState({running: currentUser.admin})
  }

  async updateContent() {
    if(!this.props.currentCodingQuestion) return;
    let {instruction, tips, tests, pseudo, text, solution} = this.state;
    if(this.instructionRef) {
      try {
        instruction = await this.instructionRef.save();
      }
      catch(e) {
        console.log('failed to get instruction clean data')
      }
    }
    const updatingFields = {tips, tests, pseudo, text, solution, instruction};
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

  expandSideBar(e) {
    if(this.state.sidebarClosed) {
      this.sidebarRef.current.style.width = "45rem";
      this.sidebarRef.current.style.padding = null;
      this.setState(state => ({sidebarClosed: !state.sidebarClosed}))
    }
    else {
      this.sidebarRef.current.style.width = 0;
      this.sidebarRef.current.style.padding = 0;
      this.setState(state => ({sidebarClosed: !state.sidebarClosed}))
    }
  }

  render() {
    let code = '';
    if(this.state.editorMode === 'solution') {
      code = this.state.solution;
    } else {
      code = this.state.text;
    }
    const {currentUser} = this.props;
    const {questionName, editorTheme, keybinding, lang, instruction, tips, text, solution, running} = this.state;
    return (
      <Page removeFooter>
        <div className='coding-room'>
          <div className='coding-room__sidebar' ref={this.sidebarRef}>
            <h2 className='title'>{questionName}</h2>

            <div className='instruction'>
              <CleanDocViewer data={instruction}/>
            </div>

            <div className='tips'>
              {tips.length > 0 && <h5>TIPS</h5>}
              {tips.map((tip, i) => (
                <CollapibleBlock key={i} title={<div className='title'>Tip {i + 1}</div>}>
                  <p className='tip'>{tip}</p>
                </CollapibleBlock>
              ))}
            </div>

            <OuterBox>
              <BackToTopButton />
            </OuterBox>
          </div>

        <div className='coding-room__main-panel'>
          <div
            className='coding-room__sidebar--expand'
            onClick={e => this.expandSideBar(e)}
            style={{transform: this.state.sidebarClosed ? "none" : "rotateZ(180deg)"}}
          >
            <Icon.ChevronRight/>
          </div>
          <div className='console'>

            <Console
              editorTheme={editorTheme}
              keybinding={keybinding}
              lang={lang}
              editorMode={this.state.editorMode}
              handleChange={updatingFields => this.handleChange(updatingFields)}
            />
            <TimerBox
              timerType={this.state.timerType}
              durationMinute={this.state.durationMinute}
              controllable={this.state.controllable}
            />
          </div>

          <div className='main-editor'>
            <AceEditor
              showPrintMargin
              highlightActiveLine
              showGutter
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
              }}
              fontSize={14}
              width='100%'
              height="100%"
              placeholder=""
              mode={lang}
              theme={editorTheme}
              keyboardHandler={keybinding}
              value={text}
              onChange={txt => this.setState({text: txt})}
            />
          </div>

          <div className='execute-console'>
            <SubmitButton disabled={!currentUser.admin} />
            <RunButton running={this.state.running}
                       onClick={() => this.runCode()}
                       disabled={!currentUser.admin}
            />
          </div>
          {running && <LinearProgress/>}
          <div className='output-box'>
            <OutputBox output={this.state.output} />
          </div>
          </div>
        </div>
      </Page>
    )
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CodingRoom);
