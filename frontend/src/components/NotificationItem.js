import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { VIEW_ACCOUNT } from "../state/stateConstant";

function NotificationItem({ notification, dispatch }) {
  const history = useHistory();

  const viewAccount = () => {
    dispatch({ type: VIEW_ACCOUNT, payload: notification.id });
    history.push("/viewaccount");
  };

  return (
    <div className="notification" onClick={viewAccount}>
      <img
        src={notification.profileImage}
        alt="profile"
        height="30"
        width="30"
      />
      <p>{notification.message}</p>
    </div>
  );
}

export default connect()(NotificationItem);
