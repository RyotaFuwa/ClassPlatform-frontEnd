import React from "react";
import Timer from "react-compound-timer";
import "./TimerBox.css";

const TimerBox = props => {
    return (
        <div className="Timer">
            <Timer initialTime={props.minutes * 60000}
                   direction="backward"
                   checkpoints={[
                       {
                           time: 0,
                           callback: props.callbackAtZero? props.callbackAtZero : () => {},
                       }
                   ]}
            >
                {() => (
                    <React.Fragment>
                        <Timer.Minutes /> :
                        <Timer.Seconds />
                    </React.Fragment>
                )}
            </Timer>
        </div>    )
}



export default TimerBox;