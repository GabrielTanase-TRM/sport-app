import React from "react";
import Link from "next/link";
import { Paths } from "../../shared/paths.const";

const Members = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">Hello world from Members</p>
      <Link
        href={{
          pathname: `${Paths.Members.path}/[memberID]`,
          query: { memberID: "1" },
        }}
      >
        Member 1
      </Link>
      <Link
        href={{
          pathname: `${Paths.Members.path}/[memberID]`,
          query: { memberID: "2" },
        }}
      >
        Member 2
      </Link>
    </div>
  );
};

export default Members;
