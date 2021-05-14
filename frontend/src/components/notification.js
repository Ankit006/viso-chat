import React from "react";

export function ErrorBar({ message, messageType }) {
  return (
    <div className={`errorBar ${messageType}`}>
      <p>{message}</p>
    </div>
  );
}

export function SuccessBar({ message, messageType }) {
  return (
    <div className={`successBar ${messageType}`}>
      <p>{message}</p>
    </div>
  );
}
