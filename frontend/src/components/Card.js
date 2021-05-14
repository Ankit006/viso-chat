import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
// icons
import noLike from "../img/dark-heart.svg";
import Like from "../img/heart.svg";
import comments from "../img/comments.svg";
import { VIEW_ACCOUNT, SHOW_POST } from "../state/stateConstant";

function Card({
  post,
  elementView,
  accountDetail,
  dispatch,
  accountId,
  accessToken,
}) {
  const history = useHistory();
  const [like, setLike] = useState(false);
  const handleAccountView = () => {
    if (post.userId === accountId) {
      history.push("/account");
      return;
    }
    dispatch({ type: VIEW_ACCOUNT, payload: post.userId });
    history.push("/viewaccount");
  };

  const showComments = () => {
    dispatch({ type: SHOW_POST, payload: post });
    history.push("/showComments");
  };

  const addLike = async () => {
    setLike(true);
    const res = await axios.post(
      "/api/addLike",
      {
        postId: post._id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.data.status === "success") {
      console.log("success");
    }
  };
  /**
   *  if accountDetail property is "all" than while
   * loading post card will also show username and the profileImage
   * on the top left corner otherwise it will not show it
   */

  return (
    <div className="card" ref={elementView}>
      {accountDetail === "all" ? (
        <div className="user">
          <img
            src={post.profileImg}
            onClick={handleAccountView}
            alt="profilePic"
            height="50"
            width="50"
          />
          <p onClick={handleAccountView}>{post.username}</p>
        </div>
      ) : null}
      <div className="userPost">
        <img src={post.imageUrl} alt="postPic" width="500" height="300" />
        <p>{post.description}</p>
      </div>
      <div className="commentSection">
        <span onClick={addLike}>
          {like ? (
            <img src={Like} alt="noLike" height="23" width="23" />
          ) : (
            <img src={noLike} alt="noLike" height="23" width="23" />
          )}
        </span>
        <img
          src={comments}
          alt="comments"
          height="23"
          width="23"
          onClick={showComments}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    accountId: state.userdata.userId,
    accessToken: state.token.accessToken,
  };
}

export default connect(mapStateToProps)(Card);
