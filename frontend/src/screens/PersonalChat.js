import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import socket from "../modules/handleSocket";
import ChatView from "../components/ChatView";
import SendInput from "../components/SendInput";
import DOMPurify from "dompurify";
// logo

function PersonalChat({ userId, username, profileImg, accountId }) {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [reciveMessage, setReciveMessage] = useState([]);
  const [status, setStatus] = useState("");

  const setChats = (e) => {
    setMessage(DOMPurify.sanitize(e.target.value));
  };

  const sendMessage = () => {
    socket.emit("sendMessage", {
      from: accountId,
      message: message,
      to: userId,
    });
    let newMessages = [...reciveMessage, { messages: message, id: accountId }];
    setReciveMessage(newMessages);
    setMessage("");
  };

  useEffect(() => {
    if (userId === "") {
      history.push("/");
    }
    socket.on("reciveMessage", (msg) => {
      // setReciveMessage(prevMessage);
      setReciveMessage((prevState) => [
        ...prevState,
        { messages: msg.message, id: msg.from },
      ]);
    });
    socket.emit("getMessages", { from: accountId, to: userId });
    socket.on("getMessages", (msg) => {
      let oldMessages = Array.from(msg);
      setReciveMessage(oldMessages);
    });

    socket.on("isUserActive", (msg) => setStatus(msg.message));

    socket.emit("openChat", { accountId, userId });

    return () => {
      socket.emit("closeChat", { accountId, userId });
      socket.off("message");
      socket.off("getMessages");
      socket.off("reciveMessage");
      socket.off("isUserActive");
    };
  }, []);

  return (
    <>
      <div className="personalChat">
        <div className="userInfo">
          <div>
            <img src={profileImg} alt="profile_image" height="50" width="50" />
            <div
              style={{ backgroundColor: status === "online" ? "green" : "red" }}
            ></div>
          </div>
          <p>{username}</p>
        </div>
      </div>
      <div className="chatArea">
        {reciveMessage
          ? reciveMessage.map((message, index) => (
              <ChatView
                key={index}
                message={message}
                RecivedUserId={userId}
                accountId={accountId}
              />
            ))
          : null}
      </div>
      <SendInput
        onChangeValue={setChats}
        value={message}
        sendMessage={sendMessage}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    // following user details
    userId: state.personalChatUserData.personalChatUser.userId,
    username: state.personalChatUserData.personalChatUser.username,
    profileImg: state.personalChatUserData.personalChatUser.userProfileImg,
    accountId: state.userdata.userId,
  };
}

export default connect(mapStateToProps)(PersonalChat);
