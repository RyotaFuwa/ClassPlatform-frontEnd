import React, {Component} from "react";
import Timer from "react-compound-timer";
import "./TimerBox.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class TimerBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerType: props.timerType,
            controllable: props.controllable,
            durationMinute: props.durationMinute,
            onEnd: props.onEnd ? props.onEnd : () => {},

            leftButtonTxt: props.controllable ? "start" : "stop",
        }
    }

    onClickLeftButton = (e, start, stop) => {
        if(this.state.leftButtonTxt === "start") {
            this.setState(state => ({leftButtonTxt: "stop"}),
                () => {start(e)});
        }
        else if(this.state.leftButtonTxt === "stop") {
            this.setState(state => ({leftButtonTxt: "resume"}),
                () => {stop(e)});
        }
        else if(this.state.leftButtonTxt === "resume") {
            this.setState(state => ({leftButtonTxt: "stop"}),
                () => {start(e)});
        }
    }

    renderContent = (start, stop, reset) => {
        return (
            <div className="timerbox">
                <div className="timerbox-timer">
                    <Timer.Hours  /> :
                    <Timer.Minutes /> :
                    <Timer.Seconds /> &nbsp;
                </div>
                <ButtonGroup className="timerbox-buttons">
                    <Button className="btn-sm mr-1" variant="primary"
                            onClick={e => {this.onClickLeftButton(e, start, stop); }}
                            disabled={!this.state.controllable}>
                        {this.state.leftButtonTxt}
                    </Button>
                    <Button className="btn-sm" variant="danger"
                            onClick={e => {this.setState(state => ({leftButtonTxt: "start"})); stop(e); reset(e); }}
                            disabled={!this.state.controllable}>
                        Reset
                    </Button>
                </ButtonGroup>

            </div>
        )
    }

    renderStopwatch = () => {
        return (
                <Timer  startImmediately={false}
                        formatValue={number => (("00" + number).slice(-2))}>
                    {({start, stop, reset}) => this.renderContent(start, stop, reset)}
                </Timer>
        )
    }

    renderTimer = () => {
        return (
            <Timer  startImmediately={!this.state.controllable}
                    initialTime={this.state.durationMinute * 60000}
                    formatValue={number => (("00" + number).slice(-2))}
                    direction="backward"
                    checkpoints={[{time: 0, callback: this.state.onEnd}]}>
                {({start, stop, reset}) => this.renderContent(start, stop, reset)}
            </Timer>
            )
    }

    render() {
        if(this.state.timerType == "stopwatch") {
            return this.renderStopwatch();
        }
        if(this.state.timerType == "timer") {
            return this.renderTimer();
        }
    }
}



export default TimerBox;