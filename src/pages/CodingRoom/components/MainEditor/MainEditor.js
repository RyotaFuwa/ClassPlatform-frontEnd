import React from "react";
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

export default MainEditor;