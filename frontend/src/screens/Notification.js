import React from "react";
import BottomNavBar from "../components/BottomNavBar";
import NotificationItem from "../components/NotificationItem";
import { connect } from "react-redux";
import cancel from "../img/cancel.svg";
import { REMOVE_NOTIFICATIONS } from "../state/stateConstant";
import socket from "../modules/handleSocket";

function Notification({ notifications, accountId, dispatch }) {
  const removeAllNotifications = () => {
    dispatch({ type: REMOVE_NOTIFICATIONS });
    socket.emit("delNotifications", { accountId });
  };

  return (
    <>
      <div className="notificationArea">
        {notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
      </div>
      {notifications.length > 0 ? (
        <img
          src={cancel}
          alt="cancel"
          height="45"
          width="45"
          className="clear"
          onClick={removeAllNotifications}
        />
      ) : null}
      <BottomNavBar />
    </>
  );
}

function mapStateToprops(state) {
  return {
    notifications: state.saveNotifications.notifications,
    accountId: state.userdata.userId,
  };
}

export default connect(mapStateToprops)(Notification);
