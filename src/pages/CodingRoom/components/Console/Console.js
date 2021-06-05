import SelectPopover from "../../../../components/SelectPopover/SelectPopover";
import React from "react";

const Console = props => {
  return (
    <div className="console">
      <span className='m-1'/>
      <SelectPopover
        options={['monokai', 'github', 'dawn'].map(each => ({label: each, value: each, disabled: false}))}
        color='primary'
        value={props.editorTheme}
        handleChange={e => props.handleChange({editorTheme: e.target.value})}
      />
      <span className='m-1'/>
      <SelectPopover
        options={['sublime', 'vim', 'emacs'].map(each => ({label: each, value: each, disabled: false}))}
        color='primary'
        value={props.keybinding}
        handleChange={e => props.handleChange({keybinding: e.target.value})}
      />
      <span className='m-1'/>
      <SelectPopover
        color='primary'
        options={[
          {label: 'python', value: 'python', disabled: false},
          {label: 'javascript', value: 'javascript', disabled: true},
          {label: 'java', value: 'java', disabled: true},
          {label: 'C++', value: 'c_cpp', disabled: true},
        ]}
        value={props.lang}
        handleChange={e => props.handleChange({lang: e.target.value})}
      />
      {props.admin &&
      <>
        <span className='m-1'/>
        <SelectPopover
          color='secondary'
          options={[
            {label: 'Initial Text', value: 'text'},
            {label: 'Solution', value: 'solution'},
          ]}
          value={props.editorMode}
          handleChange={e => props.handleChange({editorMode: e.target.value})}
        />
        <span className='m-1'/>
        <SelectPopover
          color='secondary'
          options={[
            {label: 'Tests', value: 'tests'},
          ]}
          value='tests' //now its not working
        />
      </>
      }
    </div>
  )
}

export default Console;