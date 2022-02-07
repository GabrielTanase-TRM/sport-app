import React from "react";
import { DefaultCardProps } from "./index.interface";

const DefaultCard: React.FC<DefaultCardProps> = ({
  icon,
  headline,
  description,
  label,
}) => {
  const Icon = icon;
  return (
    <div className="flex items-center justify-between bg-lightSecondaryBackground dark:bg-darkSecondaryBackground rounded-md m-4 p-2 max-w-sm">
      <div className="flex items-center">
        <div className="mr-2">
          <Icon size={18} />
        </div>
        <div>
          <div className="text-sm font-semibold">{headline}</div>
          <div className="text-xs text-helperText">{description}</div>
        </div>
      </div>
      <div>
        {label && (
          <span className=" bg-lightBackground rounded-md p-1 text-xxs font-germania tracking-wider">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default DefaultCard;
