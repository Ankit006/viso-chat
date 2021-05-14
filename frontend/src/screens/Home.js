import React from "react";
// components
import UpperNav from "../components/upperNavBar";
import Posts from "../components/Posts";
import BottomNavBar from "../components/BottomNavBar";

function Home() {
  return (
    <div>
      <UpperNav />
      <div className="home">
        <Posts
          api="/api/getPosts"
          marginTop="80px"
          accountDetail="all"
          method="get"
        />
      </div>
      <BottomNavBar />
    </div>
  );
}

export default Home;
