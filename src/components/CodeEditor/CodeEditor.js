import React from "react";
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
import "./CodeEditor.css";
import {Dropdown, Tab, Tabs, Row} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const got = require('got');
const API_URL = 'localhost:3001/api';
class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width ? props.width : "100%",
            height: props.height ? props.height : "100%",
            lang: "python",
            theme: "monokai",
            keybinding: "sublime",
            fontSize: 14,
            options: {
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 4,
            },

            text: props.initialCode ? props.initialCode : "",
        }
    }

    onChange = (e) => this.setState({text: e});
    onLoad = () => {}
    runOnClick = async () => {
        let {body}  = await got(`${API_URL}/coding/run/${this.state.lang}`, {
            timeout: 10000,
            headers: {'Content-type': 'application/json'},
            data: {files: [{name: 'main', content: this.state.text}]}
        });
        console.log(body);
    };


    render() {
        return (
            <div className="editor">
                <div className="editor-console">
                    <NavDropdown title="Theme">
                        <NavDropdown.Item active={this.state.theme === "monokai"} onClick={e => {this.setState({theme: "monokai"})}}>monokai</NavDropdown.Item>
                        <NavDropdown.Item active={this.state.theme === "github"} onClick={e => {this.setState({theme: "github"})}}>github</NavDropdown.Item>
                        <NavDropdown.Item active={this.state.theme === "dawn"} onClick={e => {this.setState({theme: "dawn"})}}>dawn</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Editor" id="nav-dropdown">
                        <NavDropdown.Item active={this.state.keybinding === "sublime"} onClick={e => {this.setState({keybinding: "sublime"})}}>sublime</NavDropdown.Item>
                        <NavDropdown.Item active={this.state.keybinding === "vim"} onClick={e => {this.setState({keybinding: "vim"})}}>vim</NavDropdown.Item>
                        <NavDropdown.Item active={this.state.keybinding === "emacs"} onClick={e => {this.setState({keybinding: "emacs"})}}>emacs</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Language" id="nav-dropdown">
                        <NavDropdown.Item active={this.state.lang === "python"} onClick={e => {this.setState({lang: "python"})}}>python</NavDropdown.Item>
                        <NavDropdown.Item active={this.state.lang === "c++"} onClick={e => {this.setState({lang: "c++"})}}>c++</NavDropdown.Item>
                        <NavDropdown.Item active={this.state.lang === "java"} onClick={e => {this.setState({lang: "java"})}}>java</NavDropdown.Item>
                        <NavDropdown.Item active={this.state.lang === "javascript"} onClick={e => {this.setState({lang: "javacript"})}}>javascript</NavDropdown.Item>
                    </NavDropdown>
                </div>

                <div className="editor-run">
                    <Button  className="w-100 btn-sm"  variant="primary" onClick={this.runOnClick}>
                        Run
                    </Button>
                </div>

                <div className="editor-editor border-basic">
                    <AceEditor
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        name="code-editor"
                        width="100%"
                        height="100%" placeholder=""
                        fontSize={this.state.fontSize}
                        setOptions={this.state.options}

                        lang={this.state.lang}
                        theme={this.state.theme}
                        keyboardHandler={this.state.keybinding}
                        value={this.state.text}
                        defaultValue={this.state.text}

                        onLoad={this.onLoad}
                        onChange={this.onChange}
                    />
                </div>

                <div className="editor-terminal">
                    <div className='w-100 h-100 border-basic' />
                </div>
            </div>
        )
    }
}

export default CodeEditor;
