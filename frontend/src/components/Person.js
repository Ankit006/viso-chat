import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { SAVE_PERSONALCHAT_USER_DATA } from "../state/stateConstant";

function Person({ imgUrl, username, elementView, dispatch, userId }) {
  const history = useHistory();

  const gotoPrivate = () => {
    dispatch({
      type: SAVE_PERSONALCHAT_USER_DATA,
      payload: { userId, username, imgUrl },
    });
    history.push("/personalChat");
  };

  return (
    <div ref={elementView} className="person">
      <img
        onClick={gotoPrivate}
        src={imgUrl}
        alt="person"
        height="50"
        width="50"
      />
      <p onClick={gotoPrivate}>{username}</p>
    </div>
  );
}

export default connect()(Person);
