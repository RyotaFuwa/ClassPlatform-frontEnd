import React from 'react';
import {Provider} from "react-redux";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import './App.css';

import HomePage from "./pages/HomePage/HomePage";
import CodingRoom from "./pages/CodingRoom/CodingRoom";
import ClassBoard from "./pages/ClassRoom/ClassBoard";
import ClassRoom from "./pages/ClassRoom/ClassRoom";
import MyDeskPage from "./pages/MyDeskPage/MyDeskPage";
import MyProfilePage from "./pages/MyProfilePage/MyProfilePage";
import AboutThisWebsitePage from "./pages/AboutThisWebsitePage/AboutThisWebsitePage";
import CodingBoard from "./pages/CodingRoom/CodingBoard";
import WebsiteSetting from "./pages/WebsiteSetting/WebsiteSetting";

import store from "./redux/store";
import UIPassword from "./pages/UIPassword/UIPassword";
import NotFound from "./components/NotFound/NotFound";
import {auth, createNewUserIfNoMatch, firestore} from "./firebase/firebase.utils";
import NavBar from "./components/NavBar/NavBar";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (!user) {
        this.setState({currentUser: user})
      }
      else {
        const userRef = await createNewUserIfNoMatch(user, {admin: false});
        //on snapchat change (i.e. fired if a new user is created)
        userRef.onSnapshot(async snapshot => {
          this.setState({
            currentUser: {
              id: userRef.id,
              ...snapshot.data(),
            }
          })
        })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log(this.state.currentUser);
    return (
      <div className="App light">
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/mydesk/" component={MyDeskPage}/>
              <Route path="/uipasswd/" component={UIPassword}/>
              <Route path="/classboard/" component={ClassBoard}/>
              <Route path="/classroom/:class" component={ClassRoom}/>
              <Route path="/codingroom/:question" component={CodingRoom}/>
              <Route path="/codingroom/" component={CodingRoom}/>
              <Route path="/codingboard" component={CodingBoard}/>
              <Route path="/questionboard/:question" component={CodingBoard}/>
              <Route path="/myprofile" component={MyProfilePage}/>
              <Route path="/aboutthiswebsite" component={AboutThisWebsitePage}/>
              <Route path="/admin" component={WebsiteSetting}/>
              <Route path="/" render={() => <NotFound page/>}/>
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
