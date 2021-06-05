import React from "react";
import {connect} from 'react-redux';
import TimerBox from "../../components/TimerBox/TimerBox";

import {AppPage, Header} from "../../components/Page/Page";
import "./CodingRoom.css";

import {
  getCodingQuestionByName, getContent, updateContent,
} from "../../firebase/firebase.firestore.codingQuestions";

import {mapDispatchToProps, mapStateToProps} from "./consts";
import Title from "./components/Primitives/Title";
import Console from "./components/Console/Console";
import RunButton from "./components/Primitives/RunButton";
import MainEditor from "./components/MainEditor/MainEditor";
import OutputBox from "./components/Primitives/OutputBox";
import DocsTabs from "./DocTabs/DocTabs";
import {edit} from "ace-builds";
import {key} from "../../js/misc";

//TODO: use redux-session to hold question text.

const DEFAULT_EDITOR_THEME = 'monkai';
const DEFAULT_KEYBINDING = 'sublime';
const DEFAULT_LANG = 'python';

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

      running: false,
      editorMode: 'text'
      // editing: this.props.currentUser && this.props.currentUser.admin,
    };

    this.instructionRef = null;
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
    this.setState({running: true})
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

  render() {
    const admin = (this.props.currentUser && this.props.currentUser.admin);
    let code = '';
    if(this.state.editorMode === 'solution') {
      code = this.state.solution;
    } else {
      code = this.state.text;
    }
    const {editorTheme, keybinding, lang} = this.state;
    return (
      <AppPage>
        <div className='coding-room'>
          <Header
            left={(
              <Title
                name={this.state.questionName}
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
            editorTheme={editorTheme}
            keybinding={keybinding}
            lang={lang}
            editorMode={this.state.editorMode}
            handleChange={updatingFields => this.handleChange(updatingFields)}
          />
          <RunButton
            running={this.state.running}
            onClick={() => this.runCode()}
          />
          <MainEditor
            text={code}
            theme={this.state.editorTheme}
            keybinding={this.state.keybinding}
            lang={this.state.lang}
            onChange={txt => this.setState({[this.state.editorMode]: txt})}
          />
          <OutputBox output={this.state.output} />
          <DocsTabs
            instruction={this.state.instruction}
            setInstructionRef={instance => this.instructionRef = instance}
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



export default connect(mapStateToProps, mapDispatchToProps)(CodingRoom);
