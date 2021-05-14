import React, { useState } from "react";
import Posts from "../components/Posts";
import { connect } from "react-redux";
import { errorBarControl } from "../modules/notificationBarControl";
import { ErrorBar } from "../components/notification";
import { follow, unfollow } from "../requests/followHandler";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
/***
 *  component show user account and other users account
 *  this component also show the posts created by a user using Post component
 */

function Account({
  username,
  profileImage,
  follower,
  following,
  api,
  personalAccount,
  method,
  jsonData,
  accountId,
  otherUserId,
  isFollowing,
  accessToken,
  dispatch,
  login,
  gotoPrivateChat,
}) {
  const [followThisPerson, setFollowThisPerson] = useState(isFollowing);
  const [error, setError] = useState({ type: "", message: "" });
  const history = useHistory();
  const handleFollow = () => {
    if (!login) {
      history.push("/login");
    }
    follow(
      accountId,
      otherUserId,
      accessToken,
      errorBarControl,
      setError,
      setFollowThisPerson,
      dispatch
    );
  };
  const handleUnFollow = () => {
    unfollow(
      accountId,
      otherUserId,
      accessToken,
      errorBarControl,
      setError,
      setFollowThisPerson,
      dispatch
    );
  };
  return (
    <>
      <div className="account">
        <div className="account-details">
          <div className="userInfo">
            <div className="user-details">
              <img
                src={profileImage}
                className="rounded"
                alt="profileImg"
                height="70"
                width="70"
              />
              <div>
                <h2 className="text-center">{follower}</h2>
                <p>Follower</p>
              </div>
              <div>
                <h2 className="text-center">{following}</h2>
                <p>Following</p>
              </div>
            </div>
            <h3 className="account-name">{username}</h3>
            {personalAccount ? (
              <Link to="/settings">
                <button className="btn-full-primary">account setting</button>
              </Link>
            ) : null}
            {!personalAccount ? (
              <button onClick={gotoPrivateChat} className="btn-full-primary">
                chat
              </button>
            ) : null}
            {personalAccount ? null : followThisPerson ? (
              <button className="btn-full-caution" onClick={handleUnFollow}>
                unfollow
              </button>
            ) : (
              <button className="btn-full-secondary" onClick={handleFollow}>
                follow
              </button>
            )}
          </div>
        </div>
        <div className="mar-top-1">
          <Posts
            api={api}
            marginTop="0px"
            /**
             *  because we are showing post inside an account,
             * so there is no need to show profileName and profileImage
             * in each Post cards. So, we are going to set accountDetails
             * attribute "personal"(we can use any string other than "all", because
             * if we use all than card will gonna show profile name and image)
             */
            accountDetail="personal"
            method={method}
            jsonData={jsonData}
          />
        </div>
      </div>
      <ErrorBar message={error.message} messageType={error.type} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    accessToken: state.token.accessToken,
    login: state.loginState.login,
  };
}

export default connect(mapStateToProps)(Account);
