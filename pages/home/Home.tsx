import React from "react";

const Home = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">Hello world from Homepage</p>
      <a href="/auth">Authentication</a>
      <a href="/profile">Profile</a>
    </div>
  );
};

export default Home;
