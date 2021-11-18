import React from "react";
import Link from "next/link";
import { Paths } from "../../shared/paths.const";

const Help = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">Hello world from Help</p>
      <Link
        href={{
          pathname: Paths.Homepage.path,
        }}
      >
        {Paths.Homepage.name}
      </Link>
    </div>
  );
};

export default Help;
