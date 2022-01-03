import React from "react";
import Link from "next/link";
import { Paths } from "../../../shared/paths.const";
import { useRouter } from "next/router";

const MemberID = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">Hello world from Member {router.query.membersID}</p>
      <Link
        href={{
          pathname: Paths.Members.path,
        }}
      >
        Members
      </Link>
    </div>
  );
};

export default MemberID;
