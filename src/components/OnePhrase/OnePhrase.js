import React from "react";
import signature from "../../data/signature.svg";
import "./OnePhrase.css";

//TODO
const OnePhrase = (props) => {
  return (
    <div className="z-top m-4 p-2">
      <div className="font-size-0125 font-weight-bold text-light font-family-quote"> {props.phrase} </div>
      <div className="font-size-0150 text-light text-right font-family-signature"> {props.author} </div>
    </div>
  )
}

export default OnePhrase;
