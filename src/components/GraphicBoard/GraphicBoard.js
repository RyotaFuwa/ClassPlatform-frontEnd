import React from 'react';
import rp from 'request-promise';

import './GraphicBoard.css'
import moon from "../../data/moon.svg"
import earth from "../../data/earth.svg"
import {Random} from "../../js/random.js";
/*
import rubbishBin from "../../data/rubbish_bin.svg";
import satelite from "./data/satelite.svg"
import OnePhrase from "../OnePhrase/OnePhrase";
*/


class SpaceBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "Welcome",
            circles: [],
            lines: [],
            selected: [],

            //qod: {contents: {quotes: [{author: "Ryota Fuwa", quote: "Thanks For Visiting :)"}]}},
        }
    }

    componentDidMount() {
        // this.getQuoteOfDay();
        this.getCircles(25, [0.75]);
    }

    render() {
        //const quote = this.state.qod.contents.quotes[0];
        return (
            <div className="bg-dark h-100 w-100">
                <svg viewBox="0 0 100vh 100vw" height="95vh" width="100%" xmlns="http://www.w3.org/2000/svg">
                    {this.state.circles}
                    {this.state.lines}
                </svg>
                <img src={earth} className="object-2d spin-itself-fast" id="earth" alt="logo"
                     onClick={() => {this.logInByUI();}} />
                <img src={moon} className= "object-2d spin-itself-slow" id="moon" alt="logo"
                     onClick={() => {this.resetUI()}}/>
            </div>
        );
    }

    getCircles = (number, sizeChoice) => {
        let random = new Random(140);
        const circles = [];
        const colors = ["dodgerblue", "crimson", "mediumspringgreen", "gold"];
        for(let n = 0; n < number; n++) {
            let radius = random.chooseFrom(sizeChoice);
            let x = random.chooseBetween([0, 100]);
            let y = random.chooseBetween([0, 100]);
            let color = random.chooseFrom(colors);
            circles.push(
                <circle className="object-2d static star" key={n} cx={`${x}%`} cy={`${y}%`} r={`${radius}%`}
                        stroke={color} fill={color} onMouseEnter={() => {
                            this.selectCircle(n);
                            this.drawLine();
                }} />
                    );
            this.setState({circles: circles});
        }
    }

    selectCircle = (key) => {
        if(this.state.selected.length > 1 && key === this.state.selected.slice(-1)[0]) {
            return;
        }
        this.setState(state => {
            let tmp = state.selected;
            tmp.push(key);
            return {selected: tmp};
        });
    }

    drawLine = () => {
        let edges = this.state.selected;
        if(edges.length > 1) {
            let edge1 = this.state.circles[edges[edges.length - 1]];
            let edge2 = this.state.circles[edges[edges.length - 2]];
            this.setState(state => {
                let tmp = this.state.lines;
                tmp.push(
                    //<line key={edges.length} x1={edge1.props.cx} y1={edge1.props.cy} x2={edge2.props.cx} y2={edge2.props.cy} stroke="white" />
                    <line key={edges.length - 2} x1={"10%"} y1={"10%"} x2={"90%"} y2={"90%"} stroke="white" />
                );
                return {lines: tmp};
            }, () => console.log(this.state.lines));
        }
    }

    logInByUI = () => {
        //test though
        if(this.state.selected[0] === 8) {
            this.setState(state => ({currentUser: "Ryota"}));
        }
        else {
            this.setState(state => ({currentUser: "Who the f!?"}));
        }

        this.resetUI();
    }

    resetUI = () => {
        this.setState(state => ({selected: [], lines: []}));
    }

    getQuoteOfDay = () => {
        rp("https://quotes.rest/qod")
            .then(res => this.setState({qod: JSON.parse(res)}))
            .catch(err => console.log("qod read error"));
    }
}

export default SpaceBoard;
