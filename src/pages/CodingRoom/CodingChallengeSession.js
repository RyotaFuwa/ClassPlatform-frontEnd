import React, {Component} from "react";
import CodingRoomPage from "./CodingRoomPage";
import NavBar from "../../components/NavBar/NavBar";
import {Form, Button} from "react-bootstrap";
import "./CodingChallengeSesssion.css";

const CodingChallengeSession = () => {
  //TODO: get password and session code here and then post request to get right questions stored on database or something
  //TODO: then go to coding room page
  return (
    <div className="page-app">
      <NavBar/>
      <div className="page-app-main form-box-center">
        <h1 className="m-4">Coding Challenge</h1>
        <div className="w-10p h-10p"/>
        <div>
          <Form>
            <Form.Group className="m-lg-5 text-left" controlId="formBasicEmail">
              <Form.Label>Question Code</Form.Label>
              <Form.Control type="text" placeholder="Question Code"/>
            </Form.Group>

            <Form.Group className="m-lg-5 text-left" controlId="formBasicPassword">
              <Form.Label>Session Key</Form.Label>
              <Form.Control type="password" placeholder="Session Key"/>
            </Form.Group>
            <Button className="mt-lg-5 btn-md w-25" variant="primary" type="submit">
              Enter
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CodingChallengeSession;
