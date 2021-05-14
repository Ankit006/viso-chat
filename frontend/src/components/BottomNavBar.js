import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// icons
import profile from "../img/profile.svg";
import home from "../img/home.svg";
import like from "../img/like.svg";
import search from "../img/search.svg";

function BottomNavBar({ profileImage, notifications }) {
  return (
    <div className="bottomNav ">
      <div>
        <Link to="/">
          <img src={home} alt="home" height="23" width="23" />
        </Link>
        <Link to="/search">
          <img src={search} alt="search" height="23" width="23" />
        </Link>
        <Link style={{ textDecoration: "none" }} to="/notification">
          <div className="notificationButton">
            {notifications.length > 0 ? (
              <div>
                <p>{notifications.length}</p>
              </div>
            ) : null}
            <img src={like} alt="like" height="23" width="23" />
          </div>
        </Link>
        {profileImage === "" ? (
          <Link to="/account">
            <img src={profile} alt="profile" height="23" width="23" />
          </Link>
        ) : (
          <Link to="/account">
            <img
              src={profileImage}
              className="rounded"
              alt="profile"
              height="23"
              width="23"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    profileImage: state.userdata.profileImage,
    notifications: state.saveNotifications.notifications,
  };
}

export default connect(mapStateToProps)(BottomNavBar);
