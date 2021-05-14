import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import { connect } from "react-redux";
import startUpData from "./requests/startUpdata";
import axios from "axios";
import {
  GET_ACCESS_TOKEN,
  SAVE_ALL_NOTIFICATIONS,
  SAVE_NOTIFICATION,
} from "./state/stateConstant";
import { useEffect } from "react";
import preloader from "./img/preloader.svg";
import socket from "./modules/handleSocket";
// screens
const Home = lazy(() => import("./screens/Home"));
const Login = lazy(() => import("./screens/Login"));
const SignUp = lazy(() => import("./screens/SignUp"));
const PersonalAccount = lazy(() => import("./screens/PersonalAccount"));
const Preloader = lazy(() => import("./components/preloader"));
const Search = lazy(() => import("./screens/Search"));
const ViewAccount = lazy(() => import("./screens/UsersAccount"));
const Chat = lazy(() => import("./screens/Chat"));
const PersonalChat = lazy(() => import("./screens/PersonalChat"));
const Notification = lazy(() => import("./screens/Notification"));
const ShowComments = lazy(() => import("./screens/ShowComments"));
const Post = lazy(() => import("./screens/Post"));
const Settings = lazy(() => import("./screens/Settings"));

function App({ dispatch, login, accountId }) {
  useEffect(() => {
    if (!login) {
      startUpData(dispatch);
    }

    if (login && accountId !== "") {
      socket.emit("notifications", { accountId });
      socket.on("notifications", (msg) => {
        let allNotifications = Array.from(msg);
        dispatch({ type: SAVE_ALL_NOTIFICATIONS, payload: allNotifications });
      });
      socket.on("notification", (msg) => {
        dispatch({ type: SAVE_NOTIFICATION, payload: msg });
      });
    }

    setInterval(async () => {
      if (login) {
        const accessToken = await axios.get("/api/getAccessToken");
        if (accessToken.data.status === "success") {
          dispatch({
            type: GET_ACCESS_TOKEN,
            payload: accessToken.data.accessToken,
          });
        }
      }
    }, 840000);
  }, [login]);

  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="absolute-center">
            <img src={preloader} alt="preloader" width="100" height="100" />
          </div>
        }
      >
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
          <Route path="/signup" component={SignUp} />
          <Route path="/chat" component={Chat} />
          <Route path="/personalChat" component={PersonalChat} />
          <Route path="/notification" component={Notification} />
          <Route path="/showComments" component={ShowComments} />
          <Route path="/post" component={Post} />
          <Route path="/settings" component={Settings} />
          <Route
            path="/account"
            component={() =>
              login === "" ? (
                <Preloader />
              ) : login ? (
                <PersonalAccount />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/viewaccount" component={() => <ViewAccount />} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    login: state.loginState.login,
    accountId: state.userdata.userId,
  };
}

export default connect(mapStateToProps)(App);
