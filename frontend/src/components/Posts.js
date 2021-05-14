import React, { useCallback, useRef, useState } from "react";
import { connect } from "react-redux";
import useFetchPosts from "../requests/useFetchPosts";
import Card from "./Card";
import loadingAnimation from "../img/Ellipsis-1s-200px.svg";

/**
 *  Component for rendering all post also using infinite scroll for pagination
 */

function Posts({
  api,
  marginTop,
  accountDetail,
  accessToken,
  method,
  jsonData,
}) {
  const [skip, setSkip] = useState(0);

  const observer = useRef(); // get instence of last element

  const { loading, posts, error } = useFetchPosts(
    skip,
    api,
    accessToken,
    method,
    jsonData
  );

  // observe the last element when element show in screen
  const elementObserver = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSkip((prev) => prev + 3);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="card-container" style={{ marginTop: marginTop }}>
      {posts.map((post, index) => {
        if (index + 1 === posts.length) {
          return (
            <Card
              accountDetail={accountDetail}
              post={post}
              key={post._id}
              elementView={elementObserver}
            />
          );
        } else {
          return (
            <Card accountDetail={accountDetail} post={post} key={post._id} />
          );
        }
      })}
      <div className="horizontal-center mar-bottom-2">
        {loading ? (
          <img src={loadingAnimation} alt="loading" height="50" width="100" />
        ) : null}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    accessToken: state.token.accessToken,
  };
}
export default connect(mapStateToProps)(Posts);
