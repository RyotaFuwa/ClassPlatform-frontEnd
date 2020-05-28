import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage/HomePage";
import LecturePage from "./pages/LecturePage/LecturePage";

import SpaceBoard from "./components/GraphicBoard/GraphicBoard";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      return (
          <div className="App">
              <Switch>
                  <Route path="/codingcamp2020" component={ LecturePage } />
                  <Route path="/" component={ HomePage } />
              </Switch>
          </div>
      );
  }
}

export default App;
