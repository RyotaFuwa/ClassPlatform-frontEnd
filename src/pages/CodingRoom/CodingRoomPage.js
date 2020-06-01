import React from "react";
import AceEditor from "react-ace";
import Timer from "react-compound-timer";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import TimerBox from "../../components/TimerBox/TimerBox";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import {Tabs, Tab} from "react-bootstrap";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai"

import "./CodingRoomPage.css";

//TODO: Divide it into each component
//
class CodingRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiTokenForGlot: "2c2634e4-ecc3-446e-bace-2c030900dc64",
            codeText: "",
            minutes: 2,
        };
    }
    runOnClick(e) {
    }
    render() {
        return (
            <div className="Page">
                <NavBar />
                <h1 className="Header">Coding Room  <TimerBox minutes={this.state.minutes}/></h1>
                <div className="MainFrame">
                    <div id="codeEditor">
                        <CodeEditor />
                    </div>
                    <div id="docs">
                        <Tabs>
                            <Tab eventKey="instruction" title="Instruction">
                            </Tab>
                            <Tab eventKey="hints" title="Hints">
                            </Tab>
                            <Tab eventKey="docs" title="Memo">
                                <div className="Memo">
                                    {/*
                                     - Using Google Docs now, but this could be just textarea and sync every minutes

                                     - Assuming Google Docs Scrollbar takes up another 3% of the doc*
                                    */}
                                    <iframe src="https://docs.google.com/document/d/1nzDH0jBdTicIS5gJZ2AFN82-vD7ojb4eDQjcFEcwl1A/edit?usp=sharing&rm=demo&hl=en"
                                            width="100%"
                                            height="100%" />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default CodingRoomPage;
