import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">PAGE NOT FOUND</p>
      <Link href="/">Homepage</Link>
    </div>
  );
};

export default NotFoundPage;
