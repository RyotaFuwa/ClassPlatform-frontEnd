import React, {Component} from 'react';
import ClassCard from "../ClassCard/ClassCard";
import './ClassList.css';

const ClassList = props => {
  return (
    <div className="classList">
      {props.classList.map((each, idx) => (
          <ClassCard key={idx}
                     title={each.title}
                     imgURL={each.imgURL}
          />
        )
      )}
    </div>
  )
}

export default ClassList;
