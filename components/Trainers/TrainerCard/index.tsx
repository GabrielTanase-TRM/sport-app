import Image from "next/image";
import React from "react";
import { TrainerCard } from "../index.interface";

const TrainerCard: React.FC<TrainerCard> = ({
  firstName,
  lastName,
  avatar,
}) => {
  return (
    <div>
      <Image
        src={avatar}
        width={"100%"}
        height={"100%"}
        objectFit="cover"
        alt={`${firstName} ${lastName} Logo`}
      />
      <h2>
        {firstName} {lastName}
      </h2>
    </div>
  );
};

export default TrainerCard;
