import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import TimerBox from "../../components/TimerBox/TimerBox";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import {Tab, TabBlock} from "../../components/Tab/Tab";

import "./CodingRoom.css";

class CodingRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            question: this.getQuestion(props.url),

            timerType: 'stopwatch',
            controllable: true,
            durationMinute: 45,
        };
    }

    getQuestion(url) {
        // get question by api call on url
    }


    render() {
        return (
            <div className="page-app">
                <NavBar/>
                <div className="page-app-main codingroom">
                    <h2 className="codingroom-header"> Coding Room </h2>
                    <div className="codingroom-timerbox">
                        <TimerBox timerType={this.state.timerType}
                                  durationMinute={this.state.durationMinute}
                                  controllable={this.state.controllable} />
                    </div>
                    <div className="codingroom-editor">
                        <CodeEditor tests={[]}
                        />
                    </div>
                    <div className="codingroom-docs">
                        <Tab className='w-100 h-100'>
                            <TabBlock tabName="Question">
                                <div className="h-100 codingroom-docs-content" />
                            </TabBlock>
                            <TabBlock tabName='Tips' >
                                <div className="codingroom-docs-content" />
                            </TabBlock>
                            <TabBlock tabName='Memo'>
                                <iframe src="https://docs.google.com/document/d/1nzDH0jBdTicIS5gJZ2AFN82-vD7ojb4eDQjcFEcwl1A/edit?usp=sharing&rm=demo&hl=en"
                                        frameBorder='none'
                                        width="100%"
                                        height="100%"
                                />
                            </TabBlock>
                        </Tab>
                    </div>
                </div>
            </div>
        )
    }
}

export default CodingRoomPage;
