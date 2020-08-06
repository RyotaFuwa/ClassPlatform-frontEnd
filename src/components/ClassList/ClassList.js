import React, {Component} from 'react';
import ClassCard from "../ClassCard/ClassCard";
import './ClassList.css';

const ClassList = props => {
  return (
    <div className="classList">
      {props.classList.map((each, idx) => <ClassCard key={idx} class={each} />)}
    </div>
  )
}

export default ClassList;
