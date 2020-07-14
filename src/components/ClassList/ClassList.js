import React, {Component} from 'react';
import Class from "../Class/Class";
import './ClassList.css';

const ClassList = props => {
  return (
    <div className="classList">
      {props.classList.map((each, idx) => (
          <Class key={idx}
                 title={each.title}
                 theme={each.theme}
                 description={each.description}
          />
        )
      )}
    </div>
  )
}

export default ClassList;
