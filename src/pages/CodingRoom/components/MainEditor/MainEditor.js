import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import AceEditor from "react-ace";



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
        width='100%'
        height="50rem"
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