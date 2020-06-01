import React from "react";
import signiture from "../../data/signiture.svg";
import "./OnePhrase.css";

//TODO
const OnePhrase = (props) => {
    return (
        <div>
            <h1 id="onePhrase">Let's Take Care Of The Environment  :)</h1>
            <img src={signiture} id="signiture" alt="logo" />
        </div>
    )
}

export default OnePhrase;
