import React from "react";
import Authentication from "../../Components";
import Link from "next/link";

const Auth = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <Link href="/">Homepage</Link>
      <Authentication />
    </div>
  );
};

export default Auth;
