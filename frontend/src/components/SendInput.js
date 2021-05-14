import React from "react";
import send from "../img/send.svg";
export default function SendInput({ onChangeValue, value, sendMessage }) {
  return (
    <div className="send">
      <div>
        <input type="text" onChange={onChangeValue} value={value} />
        <img
          src={send}
          alt="send"
          height="25"
          width="25"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}
