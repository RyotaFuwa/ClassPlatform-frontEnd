import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';

import HomePage from "./pages/HomePage/HomePage";
import CodingRoomSession from "./pages/CodingRoom/CodingRoomSession";
import ClassRoomSession from "./pages/ClassRoom/ClassRoomSession";
import MyDeskPage from "./pages/MyDeskPage/MyDeskPage";
import MyProfilePage from "./pages/MyProfilePage/MyProfilePage";
import AboutThisWebsitePage from "./pages/AboutThisWebsitePage/AboutThisWebsitePage";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      return (
          <div className="App">
              <Switch>
                  <Route path="/mydesk/" component={ MyDeskPage } />
                  <Route path="/classroom/" component={ ClassRoomSession } />
                  <Route path="/codingroom" component={ CodingRoomSession } />
                  <Route path="/myprofile" component={ MyProfilePage } />
                  <Route path="/aboutthiswebsite" component={ AboutThisWebsitePage } />
                  <Route path="/" component={ HomePage } />
              </Switch>
          </div>
      );
  }
}

export default App;
