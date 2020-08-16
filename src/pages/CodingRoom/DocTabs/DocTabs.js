import Paragraph from "@editorjs/paragraph";
import Header_Doc from "@editorjs/header";
import CodeSnippet from "../../../js/editorjs/block-tools/code-snippet";
import EditorJs from "react-editor-js";
import {CleanDocViewer} from "../../../components/CleanDocViewer/CleanDocViewer";
import {Tab} from "../../../components/Tab/Tab";
import Tips from "../components/Tips/Tips";
import AceEditor from "react-ace";
import React from "react";
import './DocTabs.css';

const Instruction = props => {
  const EDITOR_JS_TOOLS = {
    paragraph: {
      class: Paragraph,
    },
    header: {
      class: Header_Doc,
      config: {
        levels: [5],
        defaultLevel: 5,
      }
    },
    code: CodeSnippet,
  }

  if (props.editing) {
    return (
      <>
        <div className='instruction' id='instruction-holder' />
        <EditorJs
          holder='instruction-holder'
          data={props.instruction}
          instanceRef={instance => props.setRef(instance)}
          enableReInitialize={true}
          tools={EDITOR_JS_TOOLS}
        />
      </>
    )
  }
  else {
    return <div className='instruction'><CleanDocViewer data={props.instruction}/></div>
  }
}

const DocsTabs = props => {
  return (
    <div className='docs-tab'>
      <Tab.Tab>
        <Tab.Block name="Instruction">
          <Instruction
            instruction={props.instruction}
            setRef={instance => props.setInstructionRef(instance)}
            editing={props.editing}
            onChange={data => props.handleChange({instruction: data})}
          />
        </Tab.Block>
        <Tab.Block name='Tips'>
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
        </Tab.Block>
        <Tab.Block className='w-100 h-100' name='Pseudo'>
          <AceEditor
            showGutter={true}
            highlightActiveLine={false}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
            }}
            width="100%"
            height="100%"
            fontSize={14}
            readOnly={!props.editing}
            theme='chrome'
            mode='java'
            value={props.pseudo}
            onChange={(e) => props.handleChange({pseudo: e})}
          />
        </Tab.Block>
      </Tab.Tab>
    </div>
  )
}

export default DocsTabs;