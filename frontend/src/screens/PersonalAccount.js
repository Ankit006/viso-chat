import React from "react";
import { connect } from "react-redux";
import BottomNav from "../components/BottomNavBar";
// components
import Account from "../components/Account";
function PersonalAccount({ username, profileImage, follower, following }) {
  return (
    <>
      <Account
        username={username}
        profileImage={profileImage}
        follower={follower}
        following={following}
        personalAccount={true}
        api={`/api/userPosts`}
        method="get"
      />
      <BottomNav />
    </>
  );
}

function mapStateToProps(state) {
  return {
    username: state.userdata.username,
    profileImage: state.userdata.profileImage,
    follower: state.userdata.follower,
    following: state.userdata.following,
  };
}

export default connect(mapStateToProps)(PersonalAccount);
