import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

const NestedPathID = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">
        Hello world from Profile/[{router.query.userid}]/[
        {router.query.nestedPathId}]
      </p>
      <Link href="/">Homepage</Link>
    </div>
  );
};

export default NestedPathID;
