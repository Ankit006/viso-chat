import React, { useCallback, useRef, useState } from "react";
import BottomNavBar from "../components/BottomNavBar";
import { connect } from "react-redux";
import loadingAnimation from "../img/Ellipsis-1s-200px.svg";
import Person from "../components/Person";
import useFetchPersons from "../requests/useFetchPersons";

function Chat({ accessToken }) {
  const [skip, setSkip] = useState(0);
  const observer = useRef();

  const { persons, loading } = useFetchPersons(skip, accessToken);

  const elementObserver = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSkip((prev) => prev + 8);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <>
      <div className="chat ">
        <h1>Chat</h1>
        <div>
          {persons.map((person, index) => {
            if (index + 1 === persons.length) {
              return (
                <Person
                  key={person._id}
                  username={person.username}
                  imgUrl={person.profileImage.imageUrl}
                  elementView={elementObserver}
                  userId={person._id}
                />
              );
            } else {
              return (
                <Person
                  key={person._id}
                  username={person.username}
                  imgUrl={person.profileImage.imageUrl}
                  userId={person._id}
                />
              );
            }
          })}
          <div className="horizontal-center mar-bottom-2">
            {loading ? (
              <img
                src={loadingAnimation}
                alt="loading"
                height="50"
                width="100"
              />
            ) : null}
          </div>
        </div>
      </div>
      <BottomNavBar />
    </>
  );
}

function mapStateToProps(state) {
  return {
    accessToken: state.token.accessToken,
  };
}

export default connect(mapStateToProps)(Chat);
