import React from "react";
import "./IntroductionCard.css";

const IntroductionCard = props => {
  return (
    <div className="introduction-card">
      <div className="name">{props.name}</div>
      <div className="summary">{props.summary}</div>
      <img className="img" src={props.imageUrl} />
    </div>
  )
}