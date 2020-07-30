import React from 'react';
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";

import HomePage from "./pages/HomePage/HomePage";
import CodingRoom from "./pages/CodingRoom/CodingRoom";
import ClassBoard from "./pages/ClassRoom/ClassBoard";
import ClassRoom from "./pages/ClassRoom/ClassRoom";
import MyDeskPage from "./pages/MyDeskPage/MyDeskPage";
import MyProfilePage from "./pages/MyProfilePage/MyProfilePage";
import AboutThisWebsitePage from "./pages/AboutThisWebsitePage/AboutThisWebsitePage";
import CodingBoard from "./pages/CodingRoom/CodingBoard";
import WebsiteSetting from "./pages/WebsiteSetting/WebsiteSetting";

import UIPassword from "./pages/UIPassword/UIPassword";
import NotFound from "./components/NotFound/NotFound";
import {auth, createNewUserIfNoMatch, firestore} from "./firebase/firebase.utils";

import './App.css';

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (!user) {
        setCurrentUser(user);
      }
      else {
        const userRef = await createNewUserIfNoMatch(user, {admin: false});
        //on snapchat change (i.e. fired if a new user is created)
        userRef.onSnapshot(async snapshot => {
          setCurrentUser({
            id: userRef.id,
            ...snapshot.data(),
          })
        })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(null, mapDispatchToProps)(App);
