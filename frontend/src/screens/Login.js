import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { errorBarControl } from "../modules/notificationBarControl";
import { GET_ACCESS_TOKEN, SAVE_USERDATA, LOGIN } from "../state/stateConstant";
import socket from "../modules/handleSocket";
// components
import InputField from "../components/InputField";
import { ErrorBar } from "../components/notification";
import DOMPurify from "dompurify";

function Login({ dispatch }) {
  /**
   *  --- ------------local states--------------
   */

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ type: "", message: "" });
  const history = useHistory();

  /** ************************************* /
   *  ----- handle submit  ----------  /
   *  **************************************/

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      errorBarControl(setError, "please provide all information");
      return;
    }

    // fetch data from login api
    let res = await axios.post("/api/login", {
      username,
      password,
    });
    res = res.data;

    /**
     *  check if get error or not
     */

    if (res.status === "error") {
      // if we get error then set the error message
      errorBarControl(setError, res.message);
      return;
    } else {
      // continue if we don't have an error
      // dispatch event to save user data and accessToken
      dispatch({
        type: SAVE_USERDATA,
        payload: {
          userId: res.userId,
          username: res.username,
          email: res.email,
          profileImage: res.profileImage,
          follower: res.follower,
          following: res.following,
        },
      });
      dispatch({ type: LOGIN });
      dispatch({ type: GET_ACCESS_TOKEN, payload: res.accessToken });
      socket.auth = { accountId: res.userId };
      socket.connect();
      socket.emit("isUserActive", { status: "online" });
      history.push("/");
    }
  };

  /** ************************************* /
   *  ----- handle username  ----------  /
   *  **************************************/

  const handleUsername = (e) => {
    setUsername(DOMPurify.sanitize(e.target.value));
  };

  /** ************************************* /
   *  ----- handle password ----------  /
   *  **************************************/

  const handlePassword = (e) => {
    setPassword(DOMPurify.sanitize(e.target.value));
  };

  /**
   *  return component
   */
  return (
    <>
      <form className="absolute-center">
        <div className="form-container">
          <h1 className="authHeading text-center">Login</h1>
          <InputField
            data={handleUsername}
            fieldType="text"
            fieldName="username"
          />
          <InputField
            data={handlePassword}
            fieldType="password"
            fieldName="password"
          />
          <div className="horizontal-center mar-top-1">
            <button
              onClick={handleSubmit}
              className="btn-primary-2"
              type="submit"
            >
              submit
            </button>
          </div>
          <p className="text-center para-1-light">
            don't have an account ?{" "}
            <Link className="linkLine-primary" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </form>
      <ErrorBar message={error.message} messageType={error.type} />
    </>
  );
}

export default connect()(Login);
