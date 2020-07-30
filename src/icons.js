import React from "react";
import './icons.css';

const Play = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-caret-right-fill edit-icon" fill={props.disabled ? "lightgray" : "dodgerblue"} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
    </svg>
  </button>
)

const Stop = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-stop-fill edit-icon" fill={props.disabled ? "lightgray" : "crimson"} xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
    </svg>
  </button>
)

const Replay = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-caret-left-fill edit-icon" fill={props.disabled ? "lightgray" : "mediumseagreen"} xmlns="http://www.w3.org/2000/svg">
      <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
    </svg>
  </button>
)

const Restart = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-arrow-counterclockwise edit-icon" fill={props.disabled ? "lightgray" : "crimson"} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M12.83 6.706a5 5 0 0 0-7.103-3.16.5.5 0 1 1-.454-.892A6 6 0 1 1 2.545 5.5a.5.5 0 1 1 .91.417 5 5 0 1 0 9.375.789z"/>
      <path fillRule="evenodd" d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"/>
    </svg>
  </button>
)

const VerticalGrip = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick} onMouseDown={props.onMouseDown}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-grip-vertical edit-icon" fill={props.disabled ? "lightgray" : "black"} xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
  </button>
);

const XSquare = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-x-square edit-icon" fill={props.disabled ? "lightgray" : "crimson"} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
      <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
    </svg>
  </button>
)

const Create = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-plus-circle edit-icon" fill={props.disabled ? "lightgray" : "dodgerblue"} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
      <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
    </svg>
  </button>
)

const Update = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-chevron-right edit-icon" fill={props.disabled ? "lightgray" : "mediumseagreen"} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  </button>
);

const Delete = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-dash-circle edit-icon" fill={props.disabled ? "lightgray" : "crimson"} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"/>
    </svg>
  </button>
);

const TextHeader = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-card-heading edit-icon" fill={props.disabled ? 'lightgray' : 'black'} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
      <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/>
    </svg>
  </button>
)

const TextCard = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-card-text edit-icon" fill={props.disabled ? "lightgray" : "dodgerblue"} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
      <path fillRule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
    </svg>
  </button>
)

const Code = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.5em" height="2em" viewBox="0 0 16 16" className="bi bi-code-slash edit-icon" fill={props.disabled ? "lightgray" : "green"} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0zm-.999-3.124a.5.5 0 0 1 .33.625l-4 13a.5.5 0 0 1-.955-.294l4-13a.5.5 0 0 1 .625-.33z"/>
    </svg>
  </button>
)

const Image = props => (
  <button className={`btn-none ${props.className}`} disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.5em" height="2em" viewBox="0 0 16 16" className="bi bi-card-image edit-icon" fill={props.disabled ? "lightgray" : "orange"} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
      <path d="M10.648 7.646a.5.5 0 0 1 .577-.093L15.002 9.5V13h-14v-1l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z"/>
      <path fillRule="evenodd" d="M4.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
    </svg>
  </button>
)

const View = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-eyeglasses edit-icon" fill={props.disabled ? "lightgray" : (props.pushed ? "dimgray" : "darkgoldenrod")} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M4 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      <path fillRule="evenodd" d="M8 7a1 1 0 0 0-1 1H6a2 2 0 1 1 4 0H9a1 1 0 0 0-1-1zM0 8a.5.5 0 0 1 .5-.5h1v1h-1A.5.5 0 0 1 0 8zm15.5.5h-1v-1h1a.5.5 0 0 1 0 1z"/>
    </svg>
  </button>
)

const Edit = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-pencil edit-icon" fill={props.disabled ? "lightgray" : (props.pushed ? "dimgray" : "mediumseagreen")} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
      <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
    </svg>
  </button>
)


const Doc = props => (
  <button className='btn-none' disabled={props.disabled} onClick={props.onClick}>
    <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-layout-text-window-reverse edit-icon" fill={props.disabled ? "lightgray" : "dodgerblue"} xmlns="http://www.w3.org/2000/svg" >
      <path fillRule="evenodd" d="M2 1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
      <path fillRule="evenodd" d="M5 15V4H4v11h1zM.5 4h15V3H.5v1zM13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
    </svg>
  </button>
)

export {Play, Replay, Stop, Restart, VerticalGrip, Create, Update, Delete, XSquare, TextHeader, TextCard, Code, Image, View, Edit, Doc};