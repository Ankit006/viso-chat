import React, { useState } from "react";
import BottomNavBar from "../components/BottomNavBar";
import { connect } from "react-redux";
import ProgressBar from "../components/ProgrssBar";
import {
  errorBarControl,
  successBarControl,
} from "../modules/notificationBarControl";
import { ErrorBar, SuccessBar } from "../components/notification";
//placeholderImage
import imgPlaceHolder from "../img/camera.svg";

import axios from "axios";
import DOMPurify from "dompurify";

function Post({ accessToken }) {
  const [imgHolder, setImgHolder] = useState(imgPlaceHolder);
  const [postImg, setPostImg] = useState();
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgess] = useState(0);
  const [error, setError] = useState({ type: "", message: "" });
  const [success, setSuccess] = useState({ type: "", message: "" });

  const handlePostImg = (e) => {
    setPostImg(e.target.files[0]);
    setImgHolder(URL.createObjectURL(e.target.files[0]));
  };

  const handleStory = (e) => {
    setStory(DOMPurify.sanitize(e.target.value));
  };

  const uploadPost = async () => {
    setLoading(true);
    const postData = new FormData();
    postData.append("post", postImg);
    postData.append("story", story);
    const res = await axios.post(`/api/posts`, postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgess(percentCompleted);
      },
    });

    console.log(res.data);

    if (res.data.status === "success") {
      setLoading(false);
      successBarControl(setSuccess, "upload successfully");
    } else if (res.data.status === "error") {
      setLoading(false);
      errorBarControl(setError, "error while uploading post");
    }
  };

  return (
    <>
      <div className="post">
        <div className="postImageUpload">
          <input type="file" onChange={handlePostImg} id="postImage" hidden />
          <label htmlFor="postImage">
            <img
              src={imgHolder}
              className=""
              alt="postImg"
              height="100"
              width="150"
            />
          </label>
        </div>
        <textarea onChange={handleStory} value={story} />
        <button onClick={uploadPost}>post</button>
        {loading ? <ProgressBar complete={uploadProgress} /> : null}
      </div>

      <BottomNavBar />
      <ErrorBar message={error.message} messageType={error.type} />
      <SuccessBar message={success.message} messageType={success.type} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    accessToken: state.token.accessToken,
  };
}

export default connect(mapStateToProps)(Post);
