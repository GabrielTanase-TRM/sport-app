import React from "react";
import { TrainersList } from "../index.interface";
import TrainerCard from "../TrainerCard";

const TrainersList: React.FC<TrainersList> = ({ trainers }) => {
  const renderTrainersList = () =>
    trainers.map((trainer) => (
      <TrainerCard
        key={trainer.id}
        firstName={trainer.firstName}
        lastName={trainer.lastName}
        avatar={trainer.avatar}
      />
    ));
  return (
    <div>
      <div>search + filter + sort</div>
      {renderTrainersList()}
    </div>
  );
};

export default TrainersList;
