import React, {Component} from 'react';
import ClassCard from "../ClassCard/ClassCard";
import './ClassList.css';

const ClassList = props => {
  return (
    <div className="classList">
      {props.classList.map((each, idx) => (
          <ClassCard key={idx}
                     name={each.name}
                     imgURL={each.imgURL}
                     active={each.active}
          />
        )
      )}
    </div>
  )
}

export default ClassList;
