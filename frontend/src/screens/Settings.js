import React, { useState } from "react";
import { connect } from "react-redux";
import ButtonNavBar from "../components/BottomNavBar";
import axios from "axios";
import { CHANGE_USERNAME, RESET } from "../state/stateConstant";
import {
  errorBarControl,
  successBarControl,
} from "../modules/notificationBarControl";
import { ErrorBar, SuccessBar } from "../components/notification";
import socket from "../modules/handleSocket";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";

function Settings({ dispatch, accessToken }) {
  const history = useHistory();

  const [usernameChange, setUsernameChange] = useState({
    password: "",
    username: "",
  });

  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({ type: "", message: "" });
  const [succes, setSuccess] = useState({ type: "", message: "" });

  const usernameChange_password = (e) => {
    setUsernameChange({
      password: DOMPurify.sanitize(e.target.value),
      username: usernameChange.username,
    });
  };

  const usernameChange_username = (e) => {
    setUsernameChange({
      password: usernameChange.password,
      username: DOMPurify.sanitize(e.target.value),
    });
  };

  const changePassword_oldPassword = (e) => {
    setChangePassword({
      oldPassword: DOMPurify.sanitize(e.target.value),
      newPassword: changePassword.newPassword,
      confirmPassword: changePassword.confirmPassword,
    });
  };

  const changePassword_newPassword = (e) => {
    setChangePassword({
      oldPassword: changePassword.oldPassword,
      newPassword: DOMPurify.sanitize(e.target.value),
      confirmPassword: changePassword.confirmPassword,
    });
  };

  const changePassword_confirmPassword = (e) => {
    setChangePassword({
      oldPassword: changePassword.oldPassword,
      newPassword: changePassword.newPassword,
      confirmPassword: DOMPurify.sanitize(e.target.value),
    });
  };

  const updateUserName = async () => {
    const res = await axios.put(
      "/api/updateUserName",
      {
        password: usernameChange.password,
        username: usernameChange.username,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.data.status === "success") {
      successBarControl(setSuccess, "username updated");
      dispatch({ type: CHANGE_USERNAME, payload: usernameChange.username });
    } else if (res.data.status === "error") {
      errorBarControl(setError, "there is a problem while updating username");
    }
  };

  const updatePassword = async () => {
    const res = await axios.put(
      "/api/updatePassword",
      {
        oldPassword: changePassword.oldPassword,
        newPassword: changePassword.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.data.status === "success") {
      successBarControl(setSuccess, "password updated");
    } else if (res.data.status === "error") {
      errorBarControl(setError, "there is a problem while updating password");
    }
  };

  const logout = async () => {
    const res = await axios.post("/api/logout", null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.data.status === "success") {
      socket.emit("isUserActive", { status: "offline" });
      dispatch({ type: RESET });
      history.push("/");
    } else {
      errorBarControl(setError, "unable to logout, try again later");
      console.log(res.data.message);
    }
  };

  return (
    <>
      <div className="settings">
        <h1>Settings</h1>
        <fieldset className="changeData">
          <legend>Change Username</legend>
          <label htmlFor="password">password</label>
          <input
            onChange={usernameChange_password}
            type="password"
            className="inputData"
            id="password"
            name="password"
            value={usernameChange.password}
          />
          <label htmlFor="username">new username</label>
          <input
            onChange={usernameChange_username}
            type="text"
            id="username"
            className="inputData"
            name="username"
            value={usernameChange.username}
          />
          <div className="save">
            <button onClick={updateUserName}>save</button>
          </div>
        </fieldset>
        <fieldset className="changeData">
          <legend>Change Password</legend>
          <label htmlFor="oldPassword">old password</label>
          <input
            onChange={changePassword_oldPassword}
            type="password"
            className="inputData"
            id="oldPassword"
            name="oldPassword"
            value={changePassword.oldPassword}
          />
          <label htmlFor="newPasword">new password</label>
          <input
            onChange={changePassword_newPassword}
            type="password"
            id="newPassword"
            className="inputData"
            name="newPassword"
            value={changePassword.newPassword}
          />
          <label htmlFor="confirmPassword">confirm Password</label>
          <input
            onChange={changePassword_confirmPassword}
            type="password"
            id="confirmPassword"
            className="inputData"
            name="confirmPassword"
            value={changePassword.confirmPassword}
          />
          <div className="save">
            <button onClick={updatePassword}>save</button>
          </div>
        </fieldset>
        <div className="logout">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <SuccessBar message={succes.message} messageType={succes.type} />
      <ErrorBar message={error.message} messageType={error.type} />
      <ButtonNavBar />
    </>
  );
}

function mapStateToProps(state) {
  return {
    accessToken: state.token.accessToken,
  };
}

export default connect(mapStateToProps)(Settings);
