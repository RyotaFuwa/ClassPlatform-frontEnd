import React from "react";
import signature from "../../data/signature.svg";
import "./OnePhrase.css";

//TODO
const OnePhrase = (props) => {
    return (
        <div className="OnePhrase">
            <h1 id="phrase">Let's Take Care Of The Environment  :)</h1>
            <img id="signature" src={signature} alt="logo" />
        </div>
    )
}

export default OnePhrase;
