import React, { useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";
import Comments from "../components/Comments";
import { connect } from "react-redux";
import useFetchComments from "../requests/useFetchComments";
import SendInput from "../components/SendInput";
import axios from "axios";
import DOMPurify from "dompurify";

function ShowComments({
  post,
  accountId,
  profileImage,
  username,
  accessToken,
  login,
}) {
  const [commentSize, setCommentSize] = useState({ start: 0, end: 4 });
  const [newComment, setNewComment] = useState("");
  const observer = useRef();
  const history = useHistory();

  const { loading, comments, setComments } = useFetchComments(
    post._id,
    commentSize.start,
    commentSize.end
  );

  // observe the last element
  const elementObserver = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCommentSize({
            start: commentSize.start + 4,
            end: commentSize.end + 4,
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const handleNewComment = (e) => {
    setNewComment(DOMPurify.sanitize(e.target.value));
  };

  const saveNewComment = async () => {
    if (!login) {
      history.push("/login");
    }
    setComments((prevState) => [
      ...prevState,
      {
        comment: newComment,
        profileImage: profileImage,
        userId: accountId,
        username: username,
      },
    ]);

    const res = await axios.post(
      "/api/addComment",
      {
        postId: post._id,
        comment: newComment,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.data.status === "success") {
      console.log("success");
    }
  };

  let key = 0; // unque key
  return (
    <>
      <div className="commentPage">
        <Card post={post} accountDetail="all" />
        <div className="commentArea">
          {comments.map((comment, index) => {
            key++;
            if (index + 1 === comments.length) {
              return (
                <Comments
                  key={key}
                  comment={comment}
                  elementView={elementObserver}
                />
              );
            } else {
              return <Comments key={key} comment={comment} />;
            }
          })}
        </div>
      </div>
      <SendInput
        value={newComment}
        sendMessage={saveNewComment}
        onChangeValue={handleNewComment}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    post: state.posts.showPost,
    accountId: state.userdata.userId,
    username: state.userdata.username,
    profileImage: state.userdata.profileImage,
    accessToken: state.token.accessToken,
    login: state.loginState.login,
  };
}

export default connect(mapStateToProps)(ShowComments);
