import React, { Component } from "react";
import './Card.css'

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {info: props.info};
    }

    render() {
        return (
            <div className="Card">
                <img alt="profile" src={`https://robohash.org/${this.state.info.id}?set=set3`} />
                <h1> {this.state.info.name} </h1>
                <p> {this.state.info.email}</p>
            </div>
        );
    }
}

export default Card;
