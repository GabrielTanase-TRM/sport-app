import React from "react";
import Link from "next/link";
import { Paths } from "../../shared/paths.const";

const Trainers = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <p className="mb-2">Hello world from Trainers</p>
      <Link
        href={{
          pathname: `${Paths.Trainers.path}/[trainerID]`,
          query: { trainerID: "1" },
        }}
      >
        Trainer 1
      </Link>
      <Link
        href={{
          pathname: `${Paths.Trainers.path}/[trainerID]`,
          query: { trainerID: "2" },
        }}
      >
        Trainer 2
      </Link>
    </div>
  );
};

export default Trainers;
