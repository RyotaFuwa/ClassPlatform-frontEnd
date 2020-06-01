import React, {Component, useState} from "react";
import {Accordion, Button} from "react-bootstrap";
import HomePage from "../../pages/HomePage/HomePage";
import './Class.css'

const Class = ({imageSrc, title, description, link}) => {
    const [shown, setShown] = useState(false);
    return (
        <div className="Class">
            <div className="Class-image">
                <img alt="logo" src={imageSrc} />
            </div>
            <Accordion defaultActiveKey="1" inline>
                <Accordion.Toggle as={Button} variant="text" eventKey="0">
                    <h3 id="title"> {title} </h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <p> {description} </p>
                </Accordion.Collapse>
            </Accordion>
            <button href={link}><b>Go to Class Room</b></button>
        </div>
    );
}

export default Class;
