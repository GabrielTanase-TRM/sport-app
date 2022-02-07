import React from "react";
import { SectionDividerProps } from "./index.interface";

const SectionDivider: React.FC<SectionDividerProps> = ({ sectionName }) => {
  return (
    <div className="w-full flex items-end pl-2px mb-1">
      <span className="whitespace-nowrap text-xxxs text-disabled dark:text-darkDisabled leading-[5px] font-germania tracking-wider">
        {sectionName}
      </span>
      <span className="block w-full border-t border-disabled dark:border-darkDisabled ml-[2px]" />
    </div>
  );
};

export default SectionDivider;
