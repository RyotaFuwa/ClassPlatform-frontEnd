import React, {Component, useState} from 'react';
import './Blob.css';
import "ace-builds/src-noconflict/theme-monokai";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {cb} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {XSquare, VerticalGrip, Edit} from "../../icons";
import TextareaAutosize from 'react-textarea-autosize';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";


//TODO: deal with height, mostly on init
//TODO: data communication and data location

const BlobEditBox = props => {
  const [draggable, setDraggable] = useState(false)
  return (
    <div className='edit-control' draggable={draggable} onDragStart={props.onDragStart} onDragEnd={() => setDraggable(false)}>
      <div className='header'>
        <div className='type'>
          type: &nbsp;
          <span style={{color: 'lightgray'}}>{props.blob.type}</span>
        </div>

        <div className='control'>
          {props.blob.type === 'code' &&
            <div className='language'>
              language: &nbsp;
              <input className='border-0' value={props.blob.language}
                     onChange={(e) => props.onChange({...props.blob, language: e.target.value})}/>
            </div>
          }
          {props.blob.type === 'header' &&
            <div className='size'>
              size: &nbsp;
              <TextField select
                         value={props.blob.size}
                         onChange={(e) => props.onChange({...props.blob, size: e.target.value})}>
                {['sm', 'md', 'lg'].map(each => <MenuItem key={each} value={each}>{each}</MenuItem>)}
              </TextField>
            </div>
          }
        </div>

        <div className='ops'>
          <span className='m-1'>
            <VerticalGrip onMouseDown={() => setDraggable(true)} />
          </span>
          <span className='m-1'>
            <Edit onClick={() => props.onChange({...props.blob, mode: props.blob.mode === 0 ? 1 : 0})} pushed={props.blob.mode === 1}/>
          </span>
          <span className='m-1'>
            <XSquare onClick={props.onDelete} />
          </span>
        </div>
      </div>
      <div className='blob'>
        {props.children}
      </div>
    </div>
  )
}

const TBlob = props => {
  if(props.noTitle)
    return (
      <div className='blob'>
        {props.children}
      </div>
    );
  else
    return (
      <div className='t-blob'>
        <div className='blob-title'>{props.title}</div>
        <div className='blob'>{props.children}</div>
      </div>
    );
}

const BlobT = props => {
  if(props.noTitle)
    return (
      <div className='blob'>
        {props.children}
      </div>
    );
  else
    return (
      <div className='blob-t'>
        <div className='blob'>{props.children}</div>
        <div className='blob-title'>{props.title}</div>
      </div>
    );
}



const HeaderBlob = props => {
  let style = {fontSize: '1.25em', marginTop: null, marginBottom: '1.25em'};
  switch(props.blob.size) {
    case 'sm':
      style = {fontSize: '1em', marginTop: null, marginBottom: null};
      break;
    case 'md':
      style = {fontSize: '1.25em', marginTop: '1.5em', marginBottom: '0.5em'};
      break;
    case 'lg':
      style = {fontSize: '1.5em', marginTop: '3em', marginBottom: '1em'};
      break;
    default:
      style = {fontSize: '1em', marginTop: null, marginBottom: '0.5em'};
      break;
  }

  if(props.blob.mode === 0) {
    return <div className='blob-title' style={style} >{props.blob.header}</div>
  }
  else {
    return (
      <TextareaAutosize className='w-100 h-100 size-fixed border-0 blob-title'
                        style={style}
                        value={props.blob.header}
                        onChange={e => props.onChange({...props.blob, header: e.target.value})} />
    )
  }
}

const TxtBlob = props => {
  if(props.blob.mode === 0) {
    return (
      <div className='blob'>
        {props.blob.txt && <p>{props.blob.txt}</p>}
      </div>
    )
  }
  else {
    return (
      <div className='blob'>
        <TextareaAutosize className='w-100 h-100 size-fixed border-0'
                          value={props.blob.txt}
                          onChange={e => props.onChange({...props.blob, txt: e.target.value})} />
      </div>
    )
  }
}

const CodeBlob = props => {
  if (props.blob.mode === 0)
    return (
      <div className='blob'>
        <SyntaxHighlighter language={props.blob.language} style={cb} customStyle={{marginTop: '0px', marginBottom: '1em'}}
                           showLineNumbers>{props.blob.code}</SyntaxHighlighter>
      </div>
    )
  else
    return (
      <div className='blob'>
        <TextareaAutosize className='w-100 h-100 mt-3 mb-3 size-fixed border-0 blob-code-editor'
                          value={props.blob.code}
                          onChange={e => props.onChange(({...props.blob, code: e.target.value}))}/>
      </div>
    )
}

const ImgBlob = props => {
  if(props.editing)
    return <textarea className='w-100 h-100 size-fixed border-0 blob-code-editor' value={props.children} onChange={props.onChange} />
  else
    return <SyntaxHighlighter language={props.language} style={cb} showLineNumbers>{props.children}</SyntaxHighlighter>
}


const Blob = props => {
  switch (props.blob.type) {
    case 'header':
      return <HeaderBlob {...props} />
    case 'txt':
      return <TxtBlob {...props} />
    case 'code':
      return <CodeBlob {...props} />
    case 'img':
      return <ImgBlob {...props} />
    default:
      return null;
  }
}

export {Blob, BlobEditBox};

