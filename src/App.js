import './App.css';
import React, {lazy, Suspense} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import {auth, createNewUserIfNoMatch} from "./firebase/firebase.utils";
import Loading from "./components/Loading/Loading";

//pages
import HomePage from "./pages/HomePage/HomePage";
import WebsiteSetting from "./pages/WebsiteSetting/WebsiteSetting";
import NotFound from "./components/NotFound/NotFound";

const MyDeskPage = lazy(() => import("./pages/MyDeskPage/MyDeskPage"));

const ClassBoard = lazy(() => import("./pages/ClassBoard/ClassBoard"));
const ClassRoom = lazy(() => import("./pages/ClassRoom/ClassRoom"));
const CodingRoom = lazy(() => import('./pages/CodingRoom/CodingRoom'));
const CodingBoard = lazy(() => import('./pages/CodingBoard/CodingBoard'));
const UIPassword = lazy(() => import("./pages/UIPassword/UIPassword"));
const MyProfilePage = lazy(() => import("./pages/MyProfilePage/MyProfilePage"));


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
        <Suspense fallback={<Loading />}>
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
              <CodingRoom /> :
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
        </Suspense>
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
