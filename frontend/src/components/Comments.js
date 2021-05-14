import React from "react";

export default function Comments({ comment, elementView }) {
  return (
    <div className="commentItem" ref={elementView}>
      <div>
        <img src={comment.profileImage} alt="profile" height="30" width="30" />
        <p>{comment.username}</p>
      </div>
      <h3>{comment.comment}</h3>
    </div>
  );
}
