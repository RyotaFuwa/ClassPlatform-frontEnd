import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai"
import "./CodeEditor.css";
import {Dropdown, Tab, Tabs} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width ? props.width : "100%",
            height: props.height ? props.height : "100%",
            mode: "python",
            theme: "monokai",
            fontSize: 14,
            initialCode: props.initialCode ? props.initialCode : "",
            options: {
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 4,
            }
        }
    }

    onLoad = () => {}
    onChange = () => {}

    render() {
        return (
            <div style={{width: this.state.width, height: this.state.height}}>
                <AceEditor
                    placeholder=""
                    mode={this.state.mode}
                    theme={this.state.theme}
                    name="code-editor"
                    value={``}
                    defaultValue={this.state.defaultValue}
                    setOptions={this.state.options}
                    fontSize={this.state.fontSize}
                    onLoad={this.onLoad}
                    onChange={this.onChange}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    width="100%"
                    height="70%"
                />
                <div id="terminal">
                    <Tabs>
                        <Tab eventKey="stdout" title="StdOut">
                        </Tab>
                        <Tab eventKey="stderr" title="StdErr">
                        </Tab>
                    </Tabs>
                    <button class="TerminalButton"
                            onClick={this.runOnClick}>Run</button>
                    <NavDropdown title={this.state.theme} id="nav-dropdown">
                        <NavDropdown.Item onClick={e => {}}>XCode</NavDropdown.Item>
                        <NavDropdown.Item onClick={e => {}}>dark</NavDropdown.Item>
                        <NavDropdown.Item onClick={e => {}}>whatever</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={this.state.mode} id="nav-dropdown">
                        <NavDropdown.Item onClick={e => {}}>python</NavDropdown.Item>
                        <NavDropdown.Item onClick={e => {}}>c++</NavDropdown.Item>
                        <NavDropdown.Item onClick={e => {}}>java</NavDropdown.Item>
                        <NavDropdown.Item onClick={e => {}}>javascript</NavDropdown.Item>
                    </NavDropdown>
                </div>
            </div>
        )
    }
}

export default CodeEditor;
