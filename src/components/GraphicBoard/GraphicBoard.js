import React from 'react';

import './GraphicBoard.css'
import moon from "../../data/moon.svg"
import earth from "../../data/earth.svg"
import {Random} from "../../js/random.js";

/*
// HACK: add a little bit more of animations
import rubbishBin from "../../data/rubbish_bin.svg";
import satelite from "./data/satelite.svg"
import OnePhrase from "../OnePhrase/OnePhrase";
*/

// HACK: make each svg elem and make them interactive
// HACK: use three.js to make it 3D scene

const random = new Random(140);

class SpaceBoard extends React.Component {
  constructor(props) {
    super(props);
    /*
    let lines = [];
    for(let i=0; i < 100; i++) {
        lines.push(
            <line key={i}
                x1={`${random.chooseBetween([0, 100])}%`}
                y1={`${random.chooseBetween([0, 100])}%`}
                x2={`${random.chooseBetween([0, 100])}%`}
                y2={`${random.chooseBetween([0, 100])}%`}
                style={{stroke: 'black', strokeWidth: 2}} />
        )
    }

     */
    this.state = {
      users: [[8, 22, 3], [1], [5, 14], [14, 28]],
      circles: [],
      lines: [],
      seq: [],
      lastSelected: null,

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
        <svg height="95vh" width="100%" xmlns="http://www.w3.org/2000/svg">
          {this.state.lines}
          {this.state.circles}
        </svg>
        <img src={earth} className="object-2d spin-itself-fast earth" alt="logo"
             onClick={() => {
               this.logInByUI();
             }}/>
        <img src={moon} className="object-2d spin-itself-slow moon" alt="logo"
             onClick={() => {
               this.resetUI()
             }}/>
      </div>
    );
  }

  /*
  render() {
      return (
          <svg >

          </svg>
      )
  }
   */

  getCircles = (number, sizeChoice) => {
    const circles = [];
    const colors = ["dodgerblue", "crimson", "mediumspringgreen", "gold"];
    for (let n = 0; n < number; n++) {
      let radius = random.chooseFrom(sizeChoice);
      let x = random.chooseBetween([0, 100]);
      let y = random.chooseBetween([0, 100]);
      let color = random.chooseFrom(colors);
      circles.push(
        <circle key={n}
                className="object-2d static star"
                cx={`${x}%`}
                cy={`${y}%`}
                r={`${radius}%`}
                stroke={color}
                fill={color}
                onMouseEnter={() => this.onMouseEnter(n)}/>
      );
      this.setState({circles: circles});
    }
  }

  onMouseEnter(idx) {
    if (this.state.lastSelected === null) {
      this.setState({seq: [idx], lastSelected: idx});
      return;
    }
    if (idx === this.state.lastSelected) {
      return;
    }
    //update selected and seq
    let edge1 = this.state.circles[idx];
    let edge2 = this.state.circles[this.state.lastSelected];
    this.setState(state => (
      {
        lines: [...state.lines,
          <line key={state.lines.length}
                x1={edge1.props.cx}
                y1={edge1.props.cy}
                x2={edge2.props.cx}
                y2={edge2.props.cy}
                style={{stroke: 'white', strokeWidth: 2}}/>],
        seq: [...state.seq, idx],
        lastSelected: idx
      }));
  }

  logInByUI = () => {
    //test though
    console.log(this.state.seq);
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.seq === this.state.users[i]) {
        return true; //succeed
      }
    }
    this.resetUI(); // fail
  }

  resetUI = () => {
    this.setState(state => ({seq: [], lines: [], lastSelected: null}));
  }
}

export default SpaceBoard;
