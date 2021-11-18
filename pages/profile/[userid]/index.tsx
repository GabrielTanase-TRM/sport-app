import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const UserProfile = (props) => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">Hello world from Profile/[{router.query.userid}]</p>
      <Link href="/profile/23123123userid/1313212nestedUserId">
        Nested user id
      </Link>
      <Link href={"/profile/23123123userid/this/is/another/slug"}>Slug</Link>
    </div>
  );
};

export default UserProfile;
