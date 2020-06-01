import React, { Component } from 'react';
import Class from "../Class/Class";
import './ClassList.css';

const ClassList = props => {
    return (
        <div className="ClassList">
            {props.classes.map((each, idx) => (
                <Class key={idx}
                      title={each.title}
                      imageSrc={each.imageSrc}
                      description={each.description}
                      link={each.link}
                />
                )
            )}
        </div>
    )
}

export default ClassList;
