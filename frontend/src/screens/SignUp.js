import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import validator from "validator";
import { Link, useHistory } from "react-router-dom";
import {
  errorBarControl,
  successBarControl,
} from "../modules/notificationBarControl";
import { GET_ACCESS_TOKEN, SAVE_USERDATA, LOGIN } from "../state/stateConstant";
import socket from "../modules/handleSocket";
// components
import InputField from "../components/InputField";
import { ErrorBar, SuccessBar } from "../components/notification";
import DOMPurify from "dompurify";

// placeholder image
import imgPlaceHolder from "../img/profile.svg";

function SignUp({ dispatch }) {
  /**
   *  --- ------------local states--------------
   */

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({ type: "", message: "" });
  const [success, setSuccess] = useState({ type: "", message: "" });
  const [emailValid, setEmailValid] = useState("");
  const [passwordvalid, setPasswordValid] = useState("");
  const [imgSrc, setImgSrc] = useState(imgPlaceHolder);
  const [imgUploadRes, setImgUploadRes] = useState({ image: "", publicId: "" });
  const history = useHistory();

  /** ************************************* /
   *  ----- event handler ----------  /
   *  **************************************/

  const handleUsername = (e) => {
    setUserData({ ...userData, username: DOMPurify.sanitize(e.target.value) });
  };

  const handleEmail = (e) => {
    if (validator.isEmail(DOMPurify.sanitize(e.target.value))) {
      setEmailValid("");
    } else {
      setEmailValid("inputDataError");
    }
    setUserData({ ...userData, email: DOMPurify.sanitize(e.target.value) });
  };

  const handlePassword = (e) => {
    setUserData({ ...userData, password: DOMPurify.sanitize(e.target.value) });
  };

  const handleConfirmPassword = (e) => {
    if (userData.password === DOMPurify.sanitize(e.target.value)) {
      setPasswordValid("");
    } else {
      setPasswordValid("inputDataError");
    }
    setUserData({
      ...userData,
      confirmPassword: DOMPurify.sanitize(e.target.value),
    });
  };

  const handleFile = async (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
    const data = new FormData();
    data.append("profile", e.target.files[0]);
    const res = await axios.post("/api/signUpProfileUpload", data);
    if (res.data === "error") {
      errorBarControl(setError, res.data.message);
    } else {
      successBarControl(setSuccess, res.data.message);
      setImgUploadRes({ image: res.data.image, publicId: res.data.publicId });
    }
  };

  /** ************************************* /
   *  ----- handle submit  ----------  /
   *  **************************************/

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userData.username === "" ||
      userData.email === "" ||
      userData.password === "" ||
      userData.confirmPassword === ""
    ) {
      errorBarControl(setError, "please provide all information");
      return;
    }
    if (!validator.isEmail(userData.email)) {
      errorBarControl(setError, "invalid email");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      errorBarControl(setError, "password doesn't match");
      return;
    }

    // fetch data from login api
    let res = await axios.post("/api/signup", {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      profileImage: {
        publicId: imgUploadRes.publicId || "",
        imageUrl: imgUploadRes.image || "",
      },
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
      history.push("/");
    }
  };

  /**
   *  return component
   */
  return (
    <div>
      <form className="absolute-center">
        <div className="form-container">
          <h1 className="authHeading text-center">Signup</h1>
          <input onChange={handleFile} type="file" id="profileImage" hidden />
          <label
            className="horizontal-center mar-top-1 "
            htmlFor="profileImage"
          >
            <img
              src={imgSrc}
              className="imageUploader"
              alt="profile"
              height="80"
              width="80"
            />
          </label>
          <InputField
            data={handleUsername}
            fieldType="text"
            fieldName="username"
          />
          <InputField
            data={handleEmail}
            fieldType="email"
            fieldName="email"
            extraClass={emailValid}
          />
          <InputField
            data={handlePassword}
            fieldType="password"
            fieldName="password"
          />
          <InputField
            data={handleConfirmPassword}
            fieldType="password"
            fieldName="confirm password"
            extraClass={passwordvalid}
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
            <Link className="linkLine-primary" to="/login">
              Signup
            </Link>
          </p>
        </div>
      </form>
      <ErrorBar message={error.message} messageType={error.type} />
      <SuccessBar message={success.message} messageType={success.type} />
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(SignUp);
