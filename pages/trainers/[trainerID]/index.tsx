import React from "react";
import Link from "next/link";
import { Paths } from "../../../shared/paths.const";
import { useRouter } from "next/router";

const TrainerID = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">Hello world from Trainer {router.query.trainerID}</p>
      <Link
        href={{
          pathname: Paths.Trainers.path,
        }}
      >
        Trainers
      </Link>
    </div>
  );
};

export default TrainerID;
