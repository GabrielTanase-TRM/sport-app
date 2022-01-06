import React from "react";
import { WarningProps } from "./index.interface";
import { icon } from "../../shared/icons";

const { TiWarning } = icon;

const Warning: React.FC<WarningProps> = ({ size = 20, infoMessage }) => {
  return (
    <div className="relative">
      <TiWarning size={size} className="group text-yellowWarning" />
      {infoMessage && (
        <span
          className="absolute z-10 w-auto p-2 m-2 min-w-max top-0 left-10 rounded-md
          shadow-md text-white bg-gray-800 text-xs font-bold transition-all duration-200 
          scale-0 origin-left group-hover:scale-100"
        >
          {infoMessage}
        </span>
      )}
    </div>
  );
};

export default Warning;
