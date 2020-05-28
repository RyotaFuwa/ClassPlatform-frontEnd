import React from 'react';
import moon from "../../data/moon.svg"
import earth from "../../data/earth.svg"
import rubbishBin from "../../data/rubbish_bin.svg";
import randomChoice from "../../js/random.js";
/*
import satelite from "./data/satelite.svg"
*/
import './GraphicBoard.css'


class GraphicBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
}

class SpaceBoard extends GraphicBoard {
    render() {
        return (
            <div className="SpaceBoard">
                {this.renderCircles(100, 5)}
                <img src={earth} className="Object 2D Dynamic Earth" alt="logo" />
                <img src={moon} className="Object 2D Dynamic Moon" alt="logo" />
                <img src={rubbishBin} className="Object 2D Dynamic RubbishBin" alt="logo" />
            </div>
        );
    }

    //TODO: not being rendered
    renderCircles = (number, sizeRange) => {
        const circles = [];
        const colors = ["blue", "red", "orange", "yellow", "purple", "white", "white", "yellow"];
        for(let n = 0; n < number; n++) {
            let radius = Math.floor(Math.random() * sizeRange) + 1;
            let x = Math.floor(Math.random() * 100) + 1;
            let y = Math.floor(Math.random() * 100) + 1;
            let color = randomChoice(colors);
            circles.push(
                <circle cx={x} vw cy={y} vh r={radius} vmin stroke={color} fill={color} stroke-width="1"/>
            );
        }
        return circles;
    }
}

export default SpaceBoard;
