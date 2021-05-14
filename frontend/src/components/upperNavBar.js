import React from "react";
import { Link } from "react-router-dom";

// icons
import post from "../img/paper-plane.svg";
import messages from "../img/chats.svg";

export default function upperNavBar() {
  return (
    <div className="upperNav">
      <div>
        <Link to="/post">
          <img src={post} alt="post" height="23" width="23" />
        </Link>
        <h1>Viso</h1>
        <Link to="/chat">
          <img src={messages} alt="post" height="23" width="23" />
        </Link>
      </div>
    </div>
  );
}
