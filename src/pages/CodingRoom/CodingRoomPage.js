import titlize from 'titlize';
import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import TimerBox from "../../components/TimerBox/TimerBox";
import AceEditor from "react-ace";
import CollapibleBlock from "../../components/CollapibleBlock/CollapibleBlock";
import {Tab, TabBlock} from "../../components/Tab/Tab";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import Button from "react-bootstrap/Button";
import {key} from "../../js/misc";

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

import "./CodingRoom.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const fetch = require('node-fetch');
const API_URL = 'http://localhost:3001/api';

class CodingRoomPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            title: props.match.params.question ? titlize(props.match.params.question) : '',
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
        };
    }

    componentDidMount() {
        // get question by api call on url
        if(this.state.title !== '') {
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
        fetch(`${API_URL}/coding/questions/${this.state.title}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {question: {
                instruction: this.state.instruction,
                helps: this.state.helps,
                tests: this.state.tests,
                pseudo: this.state.pseudo,
            }}
        })
            .then(res => console.log(res.status))
            .catch(rej => console.log(rej));
    }

    renderInstruction() {
        if(true) {
            return (
                <textarea className="h-100 w-100 pl-4 border-0 justify-content-start"
                          value={this.state.instruction}
                          onChange={txt => {
                              this.setState({instruction: txt.target.value})}}
                />
            )
        } else {
            return (
                <pre className="h-100 w-100 pl-4">
                    {this.state.instruction}
                </pre>
            )
        }
    }

    renderTips() {
        if(true) {
            return (
                <div>
                    <ButtonGroup className='mt-4' >
                        <Button onClick={() => {
                            this.setState(state => {
                                state.helps.push('');
                                return{helps: state.helps};
                            })
                        }}>Add a Tip</Button>
                        <Button onClick={() => {
                            this.setState(state => {
                                state.helps.pop();
                                return{helps: state.helps};
                            })}}>Delete a Tip</Button>
                    </ButtonGroup>

                    <div className='codingroom-docs-tips'>
                        {this.state.helps.map((helpTxt, idx) => (
                            <div className='w-100'>
                                <p className='w-100 text-left'>Tips {idx + 1}</p>
                                <textarea className='w-100' style={{height: '100px'}}
                                          value={helpTxt}
                                          onChange={(e) => {
                                              let txt = e.target.value;
                                              this.setState(state => {
                                                  state.helps[idx] = txt;
                                                  return {helps: state.helps};
                                              })
                                          }}>
                                </textarea>
                            </div>
                        ))}
                    </div>
                </div>
            )
        } else {
            return (
                <div className='codingroom-docs-tips'>
                    {this.state.helps.map((helpTxt, idx) => (
                        <CollapibleBlock key={idx} title={`Tip ${idx + 1}`}>
                                        <pre>
                                            {helpTxt}
                                        </pre>
                        </CollapibleBlock>
                    ))}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="page-app">
                <NavBar/>
                <div className="page-app-main codingroom">
                    <h2 className="codingroom-header">
                        {this.state.title !== '' ? this.state.title : 'Coding Room'} &nbsp;
                        {true && <Button disabled={this.state.title === ''} onClick={() => this.saveQuestion()}> Save </Button>}
                    </h2>
                    <div className="codingroom-timerbox">
                        <TimerBox timerType={this.state.timerType}
                                  durationMinute={this.state.durationMinute}
                                  controllable={this.state.controllable} />
                    </div>

                    <div className="codingroom-editor">
                        <CodeEditor  tests={[]} initialCode={''}/>
                    </div>
                    <div className="codingroom-docs">
                        <Tab className='w-100 h-100'>
                            <TabBlock tabName="Instruction" instruction={this.state.instruction}>
                                {this.renderInstruction()}
                            </TabBlock>
                            <TabBlock tabName='Tips' >
                                {this.renderTips()}

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
                                readOnly={!true}
                                theme='github'

                                defaultValue={this.state.pseudo}
                                value={this.state.pseudo}
                                onChange={(e) => this.setState({pseudo: e})}
                            />
                        </TabBlock>
                            <TabBlock tabName='Memo'>
                                <iframe src="https://docs.google.com/document/d/1nzDH0jBdTicIS5gJZ2AFN82-vD7ojb4eDQjcFEcwl1A/edit?usp=sharing&rm=demo&hl=en"
                                        title={'memo'}
                                        frameBorder='none'
                                        width="100%"
                                        height="100%"
                                />
                            </TabBlock>
                        </Tab>
                    </div>
                </div>
            </div>
        )
    }
}

export default CodingRoomPage;
