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
import "ace-builds/src-noconflict/ext-language_tools";

import "./CodeEditor.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "@material-ui/core/Button";

const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001/api';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "100%",
      height: "100%",
      lang: "python",
      theme: "monokai",
      keybinding: "sublime",
      fontSize: 14,

      tests: props.tests,
      text: props.initialCode ? props.initialCode : "",
      output: {stdout: '', stderr: '', error: ''},
      running: false,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.running) {
      fetch(`${API_URL}/coding/run/${this.state.lang}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: this.state.text}),
      })
        .then(res => res.json())
        .then(json => {
          this.setState({output: json, running: false})
        }).catch(rej => {
        this.setState({output: {stdout: '', stderr: 'API Call Failed.\n\n', error: rej}, running: false})
      });
    }
  }

  //TODO: remove navDropdown and use something else.
  render() {
    return (
      <div className="editor">
        <div className="editor-console">
          <NavDropdown title="Theme">
            <NavDropdown.Item active={this.state.theme === "monokai"} onClick={e => {
              this.setState({theme: "monokai"})
            }}>monokai</NavDropdown.Item>
            <NavDropdown.Item active={this.state.theme === "github"} onClick={e => {
              this.setState({theme: "github"})
            }}>github</NavDropdown.Item>
            <NavDropdown.Item active={this.state.theme === "dawn"} onClick={e => {
              this.setState({theme: "dawn"})
            }}>dawn</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Editor" id="nav-dropdown">
            <NavDropdown.Item active={this.state.keybinding === "sublime"} onClick={e => {
              this.setState({keybinding: "sublime"})
            }}>sublime</NavDropdown.Item>
            <NavDropdown.Item active={this.state.keybinding === "vim"} onClick={e => {
              this.setState({keybinding: "vim"})
            }}>vim</NavDropdown.Item>
            <NavDropdown.Item active={this.state.keybinding === "emacs"} onClick={e => {
              this.setState({keybinding: "emacs"})
            }}>emacs</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Language" id="nav-dropdown">
            <NavDropdown.Item active={this.state.lang === "python"} onClick={e => {
              this.setState({lang: "python"})
            }}>python</NavDropdown.Item>
            <NavDropdown.Item active={this.state.lang === "c++"} onClick={e => {
              this.setState({lang: "c_cpp"})
            }}>c++</NavDropdown.Item>
            <NavDropdown.Item active={this.state.lang === "java"} onClick={e => {
              this.setState({lang: "java"})
            }}>java</NavDropdown.Item>
            <NavDropdown.Item active={this.state.lang === "javascript"} onClick={e => {
              this.setState({lang: "javascript"})
            }}>javascript</NavDropdown.Item>
          </NavDropdown>
        </div>

        <div className="editor-run">
          <Button fullWidth size='small' variant='contained' color="primary" onClick={() => {
            this.setState({running: true})
          }} disabled={this.state.running}>
            <div className='run-button'>
              <div />
              <div>Run</div>
              <div>
              {this.state.running && <span className="spinner-border spinner-border-sm text-light" role="status">
                <span className="sr-only"/></span>}
              </div>
            </div>
          </Button>
        </div>
        <div className="editor-editor border-basic">
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
            name="code-editor"
            width="100%"
            height="100%"
            placeholder=""

            mode={this.state.lang}
            theme={this.state.theme}
            keyboardHandler={this.state.keybinding}
            onChange={(e) => {
              this.setState({text: e})
            }}
            value={this.state.text}
            defaultValue={this.state.text}
          />
        </div>

        <div className="editor-terminal">
                    <pre className='editor-stdout border-basic'
                         style={{color: this.state.output.stdout ? 'floralwhite' : 'crimson'}}>
                        {this.state.output.stdout || (this.state.output.stderr + this.state.output.error)}
                    </pre>
        </div>
      </div>
    )
  }
}

export default CodeEditor;
