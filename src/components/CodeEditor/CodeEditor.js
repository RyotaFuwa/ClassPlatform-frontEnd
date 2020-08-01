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

import Button from "@material-ui/core/Button";
import "./CodeEditor.css";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Popover from "@material-ui/core/Popover";
import Radio from "@material-ui/core/Radio";
import LinearProgress from "@material-ui/core/LinearProgress";

const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001/api';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: {stdout: '', stderr: '', error: ''},
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

        <div className="editor-run">

        </div>
        <div className="editor-terminal">

        </div>
      </div>
    )
  }
}

export default CodeEditor;
