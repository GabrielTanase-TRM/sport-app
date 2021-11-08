import React from "react";
import Authentication from "./components";

const Auth = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">Hello world from Auth</p>
      <a href="/">Homepage</a>
      <Authentication />
    </div>
  );
};

export default Auth;
