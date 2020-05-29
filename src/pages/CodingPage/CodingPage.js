import React from "react";
import AceEditor from "react-ace";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai"

import "./CodingPage.css";

const CodingPage = props => {
    return (
        <div className="Page">
            <NavBar />
            <div className="MainFrame">
                <div id='solutions'>
                    <div className="Each-solution"></div>
                    <div className="Each-solution"></div>
                    <div className="Each-solution"></div>
                    <div className="Each-solution"></div>
                </div>
                <AceEditor className="AceEditor"
                    placeholder=""
                    mode="python"
                    theme="monokai"
                    name="code-editor"
                    fontSize={14}
                    width="60%"
                    height="66.5%"
                    margin="0"
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    onChange={e => console.log(e)}
                    value={``}
                    defaultValue={props.defaultValue}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }
                }/>
                <div className="Terminal">
                </div>
                <div className="DiscussionNote">
                    {/*
                     - Using Google Docs now, but this could be just textarea and sync every minutes

                     - Assuming Google Docs Scrollbar takes up another 3% of the doc*
                    */}
                    <iframe src="https://docs.google.com/document/d/1nzDH0jBdTicIS5gJZ2AFN82-vD7ojb4eDQjcFEcwl1A/edit?usp=sharing&rm=demo&hl=en"
                            width="100%"
                            height="100%" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CodingPage;
