import React, {Component} from "react";
import CodingRoomPage from "./CodingRoomPage";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {Form, Button, Col} from "react-bootstrap";
import "./CodingChallengeSesssion.css";

const CodingChallengeSession = props => {
    //TODO: get password and session code here and then post request to get right questions stored on database or something
    //TODO: then go to coding room page
    return (
            <div>
                <NavBar />
                <div id="codingSession">
                    <h1>Coding Challenge</h1>
                    <div>
                        <Form>
                            <Form.Group className="mt-lg-5" controlId="formBasicEmail">
                                <Form.Label>Question Code</Form.Label>
                                <Form.Control type="text" placeholder="Question Code" />
                            </Form.Group>

                            <Form.Group className="mt-lg-5" controlId="formBasicPassword">
                                <Form.Label>Session Key</Form.Label>
                                <Form.Control type="password" placeholder="Session Key" />
                            </Form.Group>
                            <Button className="mt-lg-5 btn-md w-25" variant="primary" type="submit">
                                Enter
                            </Button>
                        </Form>
                    </div>
                </div>
                <Footer />
            </div>
        )
}

export default CodingChallengeSession;
