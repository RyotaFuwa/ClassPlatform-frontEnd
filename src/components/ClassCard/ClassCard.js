import React from "react";
import {connect} from 'react-redux';
import './ClassCard.css'
import {Link} from "react-router-dom";
import {setCurrentClass} from "../../redux/class/class.actions";

const ClassCard = props => {
  const {name, active, imageUrl} = props.class;
  // check if imgURL does return a valid img
  return (
    <Link
      className='link'
      onClick={() => props.setCurrentClass(props.class)}
      to={`/classroom/${name}`}
    >
      <div className="class-card">
        <div className='img'>
          {imageUrl && <img src={imageUrl}/> }
        </div>
        <div className='title' style={{color: !active ? 'lightgray' : 'black' }}>{name}</div>
      </div>
    </Link>
  );
}

const mapDispatchToProps = dispatch => ({
  setCurrentClass: cls => dispatch(setCurrentClass(cls)),
})

export default connect(null, mapDispatchToProps)(ClassCard);
