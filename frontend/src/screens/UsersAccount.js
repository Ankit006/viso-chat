import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import BottomNav from "../components/BottomNavBar";
import Account from "../components/Account";
import { connect } from "react-redux";
import axios from "axios";
import Preloader from "../components/preloader";
import { SAVE_PERSONALCHAT_USER_DATA } from "../state/stateConstant.js";

function UsersAccount({ otherUserId, accountId, dispatch }) {
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();
  const mounted = useRef(true);
  const fetchUserInfo = async () => {
    const res = await axios.post("/api/otherUserInfo", {
      otherUserId: otherUserId,
      accountId: accountId,
    });
    if (res.data.status === "success") {
      setUserInfo(res.data);
    } else {
      history.push("/");
    }
  };

  const gotoPrivateChat = () => {
    dispatch({
      type: SAVE_PERSONALCHAT_USER_DATA,
      payload: {
        userId: userInfo.userId,
        username: userInfo.username,
        imgUrl: userInfo.profileImage,
      },
    });

    history.push("/personalChat");
  };

  useEffect(() => {
    mounted.current = true;
    fetchUserInfo();
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <>
      {userInfo !== null ? (
        <div>
          <Account
            api="/api/otherUserPost"
            jsonData={{ id: otherUserId, accountId: accountId }}
            method="post"
            username={userInfo.username}
            profileImage={userInfo.profileImage}
            follower={userInfo.follower}
            following={userInfo.following}
            isFollowing={userInfo.isFollowing}
            /**
             *  if personal account false then viewing
             * a user account it will it will not going to show
             * account setting button and if true than follow button
             * will be hidden
             */
            personalAccount={false}
            accountId={accountId}
            otherUserId={otherUserId}
            gotoPrivateChat={gotoPrivateChat}
          />
          <BottomNav />
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    otherUserId: state.viewAccount.accountView,
    accountId: state.userdata.userId,
  };
}

export default connect(mapStateToProps)(UsersAccount);
