import React, {Component} from "react";
import CodingRoomPage from "./CodingRoomPage";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const CodingRoomSession = props => {
    //TODO: get password and session code here and then post request to get right questions stored on database or something
    //TODO: then go to coding room page
    return (
            <div>
                <NavBar />
                <h1>Coding Room Session</h1>
                <Footer />
            </div>
        )
}

export default CodingRoomSession;
