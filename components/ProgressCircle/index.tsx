import React from "react";
import { ProgressCircleProps } from "./ProgressCircle.interface";

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  dimension = 100,
  value = 0,
  numberSize = 30,
  percentSize = 20,
  strokeWidth = 8,
}) => {
  const circleDimension = dimension / 2.3;
  const strokeDash = dimension * 2.62;
  return (
    <div style={{ width: dimension + 10, height: dimension + 10 }}>
      <div className="relative h-full w-full">
        <svg className="relative w-full h-full ">
          <circle
            style={{
              strokeDashoffset: strokeDash,
              strokeLinecap: "round",
              strokeWidth: `${strokeWidth}px`,
            }}
            className="w-full h-full fill-none translate-x-5px translate-y-5px stroke-placeholder strokeCustom"
            cx={circleDimension}
            cy={circleDimension}
            r={circleDimension}
          ></circle>
          <circle
            style={{
              strokeDashoffset: `calc(${strokeDash} - (${strokeDash} * ${value}) / 100)`,
              strokeDasharray: strokeDash,
              strokeLinecap: "round",
              strokeWidth: `${strokeWidth}px`,
            }}
            className="w-full h-full fill-none stroke-10px translate-x-5px translate-y-5px stroke-progress transition-all duration-200"
            cx={circleDimension}
            cy={circleDimension}
            r={circleDimension}
          ></circle>
        </svg>
        <div className="h-full w-full pb-2 pr-1 inset-0 absolute flex justify-center items-center">
          <h2
            style={{ fontSize: `${numberSize}px` }}
            className="bold text-black dark:text-lightBackground"
          >
            {value}
            <span
              style={{ fontSize: `${percentSize}px` }}
              className="bold text-black dark:text-lightBackground"
            >
              %
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};
