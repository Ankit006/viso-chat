import React from "react";

function ChatView({ message, RecivedUserId }) {
  return (
    <>
      <p className={message.id === RecivedUserId ? "otherUser" : "user"}>
        <span> {message.messages}</span>
      </p>
    </>
  );
}

export default ChatView;
