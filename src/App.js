import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
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
import {auth, createNewUserIfNoMatch} from "./firebase/firebase.utils";

import './App.css';
import NavBar from "./components/NavBar/NavBar";

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
    const { currentUser } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route
          path="/mydesk/"
          render={() =>
            currentUser ?
              <MyDeskPage/> :
              <Redirect to='/'/>
          }
        />


        <Route
          path="/classboard"
          render={() =>
            currentUser ?
              <ClassBoard/> :
              <Redirect to='/'/>
          }
        />
        <Route
          path="/classroom/:class"
          render={props =>
            currentUser ?
              <ClassRoom match={props.match} /> :
              <Redirect to='/'/>
          }
        />
        <Route
          path="/codingroom/:question"
          render={props =>
          currentUser ?
            <CodingRoom match={props.match} /> :
            <Redirect to='/'/>
          }
        />
        <Route
          path="/codingroom"
          render={() =>
          currentUser ?
            <CodingRoom/> :
            <Redirect to='/'/>
          }
        />
        <Route
          path="/codingboard"
          render={() =>
          currentUser ?
            <CodingBoard/> :
            <Redirect to='/'/>
          }
        />
        <Route
          path="/admin"
          render={() =>
            currentUser && currentUser.admin ?
              <WebsiteSetting /> :
              <Redirect to='/'/>
          }
        />
        <Route path="/uipassword/" component={UIPassword} />
        <Route path="/myprofile" component={MyProfilePage}/>
        <Route path="/aboutthiswebsite" component={AboutThisWebsitePage}/>
        <Route path="/" render={() => <NotFound page/>}/>
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
