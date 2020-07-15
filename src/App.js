import React from 'react';
import {Provider} from "react-redux";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import './App.css';

import HomePage from "./pages/HomePage/HomePage";
import CodingRoomPage from "./pages/CodingRoom/CodingRoomPage";
import CodingChallengeSession from "./pages/CodingRoom/CodingChallengeSession";
import ClassBoard from "./pages/ClassRoom/ClassBoard";
import ClassRoomPage from "./pages/ClassRoom/ClassRoomPage";
import MyDeskPage from "./pages/MyDeskPage/MyDeskPage";
import MyProfilePage from "./pages/MyProfilePage/MyProfilePage";
import AboutThisWebsitePage from "./pages/AboutThisWebsitePage/AboutThisWebsitePage";
import QuestionBoard from "./pages/CodingRoom/QuestionBoard";
import WebsiteSetting from "./pages/WebsiteSetting/WebsiteSetting";

import store from "./redux/store";
import UIPassword from "./pages/UIPassword/UIPassword";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App light">
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/mydesk/" component={MyDeskPage}/>
              <Route path="/uipasswd/" component={UIPassword}/>
              <Route path="/classboard/" component={ClassBoard}/>
              <Route path="/classroom/:class" component={ClassRoomPage}/>
              <Route path="/codingroom/:question" component={CodingRoomPage}/>
              <Route path="/codingroom/" component={CodingRoomPage}/>
              <Route path="/codingchallenge" component={CodingChallengeSession}/>
              <Route path="/questionboard" component={QuestionBoard}/>
              <Route path="/questionboard/:question" component={QuestionBoard}/>
              <Route path="/myprofile" component={MyProfilePage}/>
              <Route path="/aboutthiswebsite" component={AboutThisWebsitePage}/>
              <Route path="/admin" component={WebsiteSetting}/>
              <Route path="/" render={() => <div>Don't have such a page</div>}/>
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
