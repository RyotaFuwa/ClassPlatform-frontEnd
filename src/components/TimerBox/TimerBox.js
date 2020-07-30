import React, {Component} from "react";
import Timer from "react-compound-timer";
import "./TimerBox.css";
import {Play, Restart, Stop, Replay} from "../../icons";

const TimerOp = props => {
  switch(props.op) {
    case 0:
      return <Play onClick={props.onClick} />
    case 1:
      return <Stop onClick={props.onClick} />
    case 2:
      return <Replay onClick={props.onClick} />
    default:
      return <div />
  }
}

class TimerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerType: props.timerType,
      controllable: props.controllable,
      durationMinute: props.durationMinute,
      onEnd: props.onEnd ? props.onEnd : () => {
      },

      op: props.controllable ? 0 : 1, // 0: start, 1: stop, 2: resume
    }
  }

  onClick = (e, start, stop) => {
    switch(this.state.op) {
      case 0:
        this.setState(state => ({op: 1}), () => start(e));
        break;
      case 1:
        this.setState(state => ({op: 2}), () => stop(e));
        break;
      case 2:
        this.setState(state => ({op: 1}), () =>start(e));
        break;
      default:
        break;
    }
  }

  renderContent = (start, stop, reset) => {
    return (
      <div className="timerbox">
        <div className="timerbox-timer">
          <Timer.Hours/> :
          <Timer.Minutes/> :
          <Timer.Seconds/> &nbsp;
        </div>
        <span className="timerbox-ops">
          <TimerOp op={this.state.op} onClick={e => this.onClick(e, start, stop)} disabled={!this.state.controllable} />
          <Restart onClick={e => {this.setState(state => ({op: 0})); stop(e); reset(e);}} disabled={!this.state.controllable}/>
        </span>

      </div>
    )
  }

  renderStopwatch = () => {
    return (
      <Timer startImmediately={false}
             formatValue={number => (("00" + number).slice(-2))}>
        {({start, stop, reset}) => this.renderContent(start, stop, reset)}
      </Timer>
    )
  }

  renderTimer = () => {
    return (
      <Timer startImmediately={!this.state.controllable}
             initialTime={this.state.durationMinute * 60000}
             formatValue={number => (("00" + number).slice(-2))}
             direction="backward"
             checkpoints={[{time: 0, callback: this.state.onEnd}]}>
        {({start, stop, reset}) => this.renderContent(start, stop, reset)}
      </Timer>
    )
  }

  render() {
    if (this.state.timerType == "stopwatch") {
      return this.renderStopwatch();
    }
    if (this.state.timerType == "timer") {
      return this.renderTimer();
    }
  }
}


export default TimerBox;